# Skyline Holding: deployment guide (Hostinger VPS)

Server: `2.25.169.72` (Ubuntu/Debian Linux, x86_64). Domain: `https://skyline-holding-slu.com`. App directory: `/var/www/skyline-holding`.

## How it is deployed

```
Internet ──► Nginx :80 (:443 later, via Certbot)
               ├─ /api/*  ──► Node/Express API on 127.0.0.1:8080  (PM2, user "skyline")
               └─ /*      ──► static React build on disk           (artifacts/mockup-sandbox/dist)
```

- **Website**: a React/Vite single-page app. It is built once into static files and served directly by Nginx. No Node process is needed for it.
- **API**: a Node/Express server (`artifacts/api-server`) that handles OTP verification and sends email through Resend. It runs under PM2, bound to `127.0.0.1` only, and Nginx is the only way in.
- **Database**: none. OTP challenges are kept in a small JSON file (`REQUEST_INFO_DATA_DIR`).
- **Node.js 24 LTS** and **pnpm 10.33.2** (pinned in `package.json`; see `.nvmrc`).

| Item | Location |
|---|---|
| Nginx site config | `deployment/nginx/skyline.conf` |
| Nginx security headers (incl. CSP) | `deployment/nginx/snippets/skyline-security-headers.conf` |
| PM2 config | `ecosystem.config.cjs` |
| Update script | `scripts/deploy.sh` |
| Environment template | `.env.example` |

---

## 0. Before you start (on your own computer)

The server pulls the code from Git, so **everything must be committed and pushed first**. The current working tree has many uncommitted changes (the whole website and the OTP system are not yet in the last commit).

```bash
git status                 # make sure no .env / secrets are listed
git add -A
git commit -m "Prepare production deployment"
git push origin main
```

Use a **private** repository. `.env` is git-ignored; never commit it.

## 1. Connect and prepare the server (as root)

```bash
ssh root@2.25.169.72

apt update && apt -y upgrade
apt install -y git curl ufw nginx ca-certificates gnupg openssl

# Node.js 24 LTS
curl -fsSL https://deb.nodesource.com/setup_24.x | bash -
apt install -y nodejs
node -v            # must print v24.x

# pnpm (exact version the project pins) and PM2
npm install -g pnpm@10.33.2 pm2
```

## 2. Firewall (as root)

Only SSH and web traffic are open. **Port 8080 is not opened**: the API listens on localhost and Nginx proxies to it.

```bash
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
ufw status
```

(Allow SSH first, or you will lock yourself out.)

## 3. Create an unprivileged user and folders (as root)

```bash
adduser --disabled-password --gecos "" skyline
mkdir -p /var/www/skyline-holding
chown skyline:skyline /var/www/skyline-holding
install -d -o skyline -g skyline -m 700 /var/lib/skyline-holding   # OTP data, survives deploys
```

## 4. Get the code and create the production `.env` (as `skyline`)

```bash
sudo -iu skyline
git clone <YOUR_PRIVATE_REPO_URL> /var/www/skyline-holding
cd /var/www/skyline-holding
```

For a private repo, add a read-only **deploy key** (`ssh-keygen -t ed25519`, add the `.pub` in GitHub → Repo → Settings → Deploy keys) and clone with the SSH URL.

```bash
cp .env.example .env
chmod 600 .env
openssl rand -hex 32        # copy this value into OTP_HASH_SECRET
nano .env
```

Fill in at least: `OTP_HASH_SECRET`, `RESEND_API_KEY`, `MAIL_FROM_EMAIL`. `SITE_URL` is `https://skyline-holding-slu.com` in the template (use `http://2.25.169.72` only until the domain and HTTPS are live). See [Environment variables](#environment-variables).

## 4b. Private documents

The PDFs that are emailed after OTP verification are in `artifacts/api-server/private/documents/` and are committed to the repository, so `git pull` / `git clone` brings them to the server. Nothing needs to be uploaded separately, and Nginx never serves that folder.

**The GitHub repository is public**, so these files are also downloadable from GitHub itself, not only through the OTP email. If any of them must stay confidential, make the repository private (GitHub > Settings > Danger Zone > Change visibility) and give the server a read-only deploy key (see step 4).

To add or replace a document: put the PDF in that folder, add or update its entry in `artifacts/api-server/config/request-info-documents.ts`, commit, push, and run `deploy.sh`. If a listed file is missing on the server, visitors see "We couldn't send the documents" after verifying (check `pm2 logs skyline-holding` for the file name).

## 5. First build and start (as `skyline`)

```bash
bash scripts/deploy.sh
```

This installs the locked dependencies, runs the API tests, builds the API and the website, puts the new site live, starts the API in PM2 and health-checks it. It stops at the first error. Then make PM2 survive reboots:

```bash
pm2 save
pm2 startup systemd -u skyline --hp /home/skyline
# PM2 prints one "sudo env PATH=... pm2 startup ..." command: run THAT command as root.
exit                        # back to root
```

## 6. Nginx (as root)

```bash
cd /var/www/skyline-holding
cp deployment/nginx/skyline.conf /etc/nginx/sites-available/skyline
cp deployment/nginx/snippets/skyline-security-headers.conf /etc/nginx/snippets/
ln -sf /etc/nginx/sites-available/skyline /etc/nginx/sites-enabled/skyline
rm -f /etc/nginx/sites-enabled/default
nginx -t                    # must say "syntax is ok"
systemctl reload nginx
systemctl enable nginx
```

## 7. Check it works

```bash
curl -i http://2.25.169.72/api/health      # {"status":"ok"}
pm2 status                                  # skyline-holding: online
```

Then open **http://2.25.169.72** in a browser and test **Request Private Access** on the Investor Relations or Contact page.

---

## Environment variables

All live in `/var/www/skyline-holding/.env` on the server. Nothing secret is in the repo, the PM2 file or the deploy script.

| Variable | Required | Purpose |
|---|---|---|
| `NODE_ENV` | yes | `production` |
| `PORT` / `HOST` | yes | API port `8080` and bind address `127.0.0.1` |
| `SITE_URL` | yes | Public URL, no trailing slash. Drives the canonical URL and CORS. **The one value to change for the domain.** |
| `OTP_HASH_SECRET` | **yes** | Secret for hashing OTP codes. The API will not start without it. |
| `MAIL_PROVIDER` | yes | Must be `resend` in production. The API refuses to start with `console`. |
| `RESEND_API_KEY` | **yes** | Resend API key |
| `MAIL_FROM_EMAIL` | **yes** | Sender address on a domain verified in Resend |
| `MAIL_FROM_NAME` | no | Defaults to "Skyline Holding" |
| `REQUEST_INFO_DATA_DIR` | yes | `/var/lib/skyline-holding` (persistent, outside the project) |
| `REQUEST_INFO_OTP_TTL_MINUTES`, `REQUEST_INFO_MAX_ATTEMPTS` | no | Default 10 minutes, 5 attempts |
| `PUBLIC_SITE_URL`, `CORS_ALLOWED_ORIGINS` | no | Leave empty; both default to `SITE_URL` |
| `LOG_LEVEL` | no | `info` |

## OTP in production: what must be true

- **Email needs a verified domain.** Resend only delivers to arbitrary recipients from a sender on a domain you have verified (DNS records added at your domain registrar). Until you own a domain and verify it in Resend, real visitors will not receive codes. The site and API still run.
- There are **no OAuth callback or redirect URLs** in this OTP flow (verification happens in the page), so nothing needs a URL registered with a provider. The only provider-side setting is the verified sender domain.
- **HTTP until you have a domain.** Without HTTPS the code the visitor types travels unencrypted. Connect a domain and enable HTTPS (below) before real use.
- **Run exactly one API instance.** OTP challenges are held in one process and rate limits are in memory. `ecosystem.config.cjs` pins a single fork-mode instance; do not use PM2 cluster mode.
- Protection layers: OTP expiry, one-time use, 60 s resend cooldown, 5 attempts per code, per-email and per-IP limits in the API, plus an Nginx request limit on `/api/`.
- OTP codes, emails and secrets are not logged in production. `/api/*` responses are never cached.
- The PDFs delivered after verification live in `artifacts/api-server/private/documents/` (in the repo); that folder is never served by Nginx. The company registration certificate is also published on the website, so it exists twice: `artifacts/mockup-sandbox/public/documents/SKYLINE_HOLDING_Registry.pdf` (website) and `artifacts/api-server/private/documents/SKYLINE_HOLDING_Registry.pdf` (email attachment). **When the certificate changes, replace both copies**; a test fails if they differ.

## Everyday operations

Changes under `deployment/nginx/` (for example the `/leadership` → `/team` redirect) are **not** applied by `deploy.sh`; the site keeps running on the copy in `/etc/nginx`. After such an update (as root):

```bash
cd /var/www/skyline-holding
cp deployment/nginx/snippets/skyline-security-headers.conf /etc/nginx/snippets/
# If Certbot has already edited /etc/nginx/sites-available/skyline, do NOT overwrite it:
# copy just the changed block by hand instead. Otherwise:
cp deployment/nginx/skyline.conf /etc/nginx/sites-available/skyline
nginx -t && systemctl reload nginx
```

```bash
# Deploy an update (as skyline)
bash /var/www/skyline-holding/scripts/deploy.sh

pm2 logs skyline-holding             # live logs
pm2 logs skyline-holding --lines 100 --nostream
pm2 status
pm2 restart skyline-holding

# Roll back the website to the previous build (as skyline)
cd /var/www/skyline-holding/artifacts/mockup-sandbox
mv dist dist.bad && mv dist.old dist

# Nginx (as root)
nginx -t && systemctl reload nginx
tail -f /var/log/nginx/error.log

# Optional: keep PM2 logs from growing forever
pm2 install pm2-logrotate
```

## When the real domain is ready

1. **DNS**: at the domain registrar create `A` records for `skyline-holding-slu.com` and `www.skyline-holding-slu.com` pointing to `2.25.169.72`. Wait until `ping skyline-holding-slu.com` shows that IP.
2. **Nginx** (as root): edit `/etc/nginx/sites-available/skyline`:
   `server_name skyline-holding-slu.com www.skyline-holding-slu.com;` then `nginx -t && systemctl reload nginx`.
3. **HTTPS** (as root):
   ```bash
   apt install -y certbot python3-certbot-nginx
   certbot --nginx -d skyline-holding-slu.com -d www.skyline-holding-slu.com
   certbot renew --dry-run
   ```
   Certbot adds the certificate, port 443 and the HTTP→HTTPS redirect to the Nginx file. After that, edit the file in `/etc/nginx/sites-available/`, not the repo copy (or re-run Certbot if you re-copy it).
4. **App URL**: in `/var/www/skyline-holding/.env` set `SITE_URL=https://skyline-holding-slu.com`, then `bash scripts/deploy.sh` (rebuilds the canonical URLs and reloads the API).
5. **Email**: verify `skyline-holding-slu.com` in Resend (add its DNS records). Emails are sent as `Skyline Holding <info@skyline-holding-slu.com>`, so `MAIL_FROM_EMAIL=info@skyline-holding-slu.com` and `MAIL_FROM_NAME="Skyline Holding"`; replies go to the same address. The API key lives only in the server's `.env`.
6. **HSTS**: once HTTPS works, uncomment the `Strict-Transport-Security` line in `/etc/nginx/snippets/skyline-security-headers.conf` and reload Nginx.

## Troubleshooting

| Symptom | Likely cause / fix |
|---|---|
| `502 Bad Gateway` on `/api/...` | API not running. `pm2 logs skyline-holding`; usually a missing value in `.env` |
| PM2 shows `errored` right after start | `.env` missing or `OTP_HASH_SECRET` / `RESEND_API_KEY` / `MAIL_FROM_EMAIL` empty |
| Blank page or 404 for `/assets/...` | Website not built: run `scripts/deploy.sh`; check `root` path in the Nginx file |
| `403` / permission denied | The `skyline` user must own the app folder; Nginx (`www-data`) needs read access to the `dist` folder |
| Deploy stops with "pnpm not found" | `npm install -g pnpm@10.33.2 pm2` (as root) |
| Install fails on an ARM server | The lockfile is configured for x86_64 Linux only; use an x86_64 VPS |
