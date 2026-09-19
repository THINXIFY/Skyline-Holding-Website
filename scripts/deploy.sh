#!/usr/bin/env bash
# Skyline Holding - update deployment (run ON THE SERVER, from anywhere):
#
#     bash /var/www/skyline-holding/scripts/deploy.sh
#
# Steps: pull latest code -> install -> test API -> build website + API ->
# swap the new site in -> reload the API with PM2 -> health check.
# Stops at the first error (set -e); the previous site and the running API are
# left untouched unless every build step succeeded.
#
# No secrets here: everything private is in /var/www/skyline-holding/.env.
#
# Optional variables:  BRANCH=main   SKIP_TESTS=1   APP_DIR=/var/www/skyline-holding

set -Eeuo pipefail

APP_DIR="${APP_DIR:-/var/www/skyline-holding}"
BRANCH="${BRANCH:-main}"
SITE_DIR="artifacts/mockup-sandbox"

log() { printf '\n\033[1;33m==> %s\033[0m\n' "$*"; }
fail() { printf '\n\033[1;31mDeploy failed: %s\033[0m\n' "$*" >&2; exit 1; }
trap 'fail "step failed on line $LINENO (nothing was switched over)"' ERR

cd "$APP_DIR"

[ -f .env ] || fail ".env not found in $APP_DIR (copy .env.example to .env and fill it in)"
command -v pnpm >/dev/null || fail "pnpm not found (run: corepack enable)"
command -v pm2  >/dev/null || fail "pm2 not found (run: npm install -g pm2)"

# Read one value from .env without sourcing it (values may contain spaces/quotes).
env_value() { grep -E "^$1=" .env | tail -n1 | cut -d= -f2- | sed -e 's/^["'\'']//' -e 's/["'\'']$//' || true; }

SITE_URL="$(env_value SITE_URL)"
PORT="$(env_value PORT)"; PORT="${PORT:-8080}"
[ -n "$SITE_URL" ] || fail "SITE_URL is empty in .env"

log "Pulling $BRANCH"
git fetch --prune origin
git checkout "$BRANCH"
git pull --ff-only origin "$BRANCH"

# Do NOT set NODE_ENV=production for install/build: the build tools (vite,
# esbuild, typescript) are devDependencies. The API gets NODE_ENV from PM2.
log "Installing dependencies (locked)"
pnpm install --frozen-lockfile

if [ "${SKIP_TESTS:-0}" != "1" ]; then
  log "Running API tests"
  pnpm --filter @workspace/api-server run test
fi

log "Building the API"
pnpm --filter @workspace/api-server run build

# Build into dist.new, then swap, so Nginx never serves a half-built site.
log "Building the website (canonical URL: $SITE_URL)"
rm -rf "$SITE_DIR/dist.new"
(
  cd "$SITE_DIR"
  VITE_SITE_URL="$SITE_URL" pnpm exec vite build --outDir dist.new
)
[ -f "$SITE_DIR/dist.new/index.html" ] || fail "website build produced no index.html"

log "Switching the new website live"
rm -rf "$SITE_DIR/dist.old"
[ -d "$SITE_DIR/dist" ] && mv "$SITE_DIR/dist" "$SITE_DIR/dist.old"
mv "$SITE_DIR/dist.new" "$SITE_DIR/dist"

log "Reloading the API (PM2)"
if pm2 describe skyline-holding >/dev/null 2>&1; then
  pm2 reload ecosystem.config.cjs --update-env
else
  pm2 start ecosystem.config.cjs
fi
pm2 save >/dev/null

log "Health check"
for i in 1 2 3 4 5 6 7 8 9 10; do
  if curl -fsS "http://127.0.0.1:${PORT}/api/healthz" >/dev/null 2>&1; then
    printf 'API healthy: %s\n' "$(curl -fsS "http://127.0.0.1:${PORT}/api/healthz")"
    log "Deploy complete. Previous site kept in $SITE_DIR/dist.old (instant rollback)."
    exit 0
  fi
  sleep 1
done
fail "API did not become healthy - check: pm2 logs skyline-holding --lines 50"
