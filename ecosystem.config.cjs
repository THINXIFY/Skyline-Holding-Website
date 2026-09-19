// PM2 process definition for the Skyline Holding API (OTP + email).
//
// The website itself is static and is served straight from disk by Nginx; PM2
// only runs the Node API. Secrets are NOT in this file: they live in the
// server-side `.env` next to it, which Node loads with --env-file.
//
//   pm2 start ecosystem.config.cjs      # first start
//   pm2 reload skyline-holding          # after a deploy
//   pm2 logs skyline-holding            # logs
//
// If `.env` is missing Node refuses to start and PM2 shows the error in the
// logs - that is intentional (fail closed rather than run without secrets).

const path = require("node:path");

module.exports = {
  apps: [
    {
      name: "skyline-holding",
      cwd: __dirname,
      script: "artifacts/api-server/dist/index.mjs",
      interpreter: "node",
      node_args: ["--enable-source-maps", `--env-file=${path.join(__dirname, ".env")}`],

      // MUST stay a single fork-mode instance: OTP challenges are held in one
      // process (file-backed store) and the rate limiters are in-memory, so
      // running several instances (cluster mode) would break verification.
      exec_mode: "fork",
      instances: 1,

      // Only NODE_ENV is fixed here; everything else (PORT, HOST, SITE_URL,
      // OTP_HASH_SECRET, RESEND_API_KEY, ...) comes from `.env`.
      env: {
        NODE_ENV: "production",
      },

      // Restart on failure, with a growing delay so a crash loop can't spin.
      autorestart: true,
      exp_backoff_restart_delay: 200,
      max_restarts: 20,
      min_uptime: "10s",
      max_memory_restart: "400M",
      kill_timeout: 5000,

      // Logs (view with `pm2 logs skyline-holding`). The API already avoids
      // logging OTP codes, e-mail bodies and secrets in production.
      time: true,
      merge_logs: true,
    },
  ],
};
