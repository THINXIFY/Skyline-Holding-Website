import express, { type Express, type ErrorRequestHandler } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

// Don't advertise the framework in every response.
app.disable("x-powered-by");

// Trust exactly one reverse-proxy hop (this app's standard deployment
// topology puts one proxy/load balancer in front of it) so Express derives
// the real client IP from X-Forwarded-For for rate limiting. `1`, not
// `true` - `true` would trust the entire X-Forwarded-For chain, which a
// client can spoof to defeat per-IP rate limits.
app.set("trust proxy", 1);

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
// CORS_ALLOWED_ORIGINS is a comma-separated allowlist (e.g.
// "https://your-site.example,https://your-frontend.example"). When it is not
// set, SITE_URL (the single production URL setting) is used, so switching
// from the server IP to the final domain is one value.
// Fail closed in production rather than silently default to
// Access-Control-Allow-Origin: * - the same philosophy already applied to
// MAIL_PROVIDER in lib/env.ts. Outside production this stays wide open
// (unchanged from before), so local dev and the Vite proxy keep working
// with zero configuration.
function toOrigin(value: string): string {
  try {
    return new URL(value).origin;
  } catch {
    return value;
  }
}
const corsAllowedOrigins = (process.env.CORS_ALLOWED_ORIGINS || process.env.SITE_URL || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean)
  .map(toOrigin);
if (process.env.NODE_ENV === "production" && !corsAllowedOrigins.length) {
  throw new Error(
    "CORS_ALLOWED_ORIGINS or SITE_URL must be set in production - refusing to default to an open CORS policy.",
  );
}
app.use(cors(corsAllowedOrigins.length ? { origin: corsAllowedOrigins } : undefined));
app.use(express.json({ limit: "15kb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.use("/api", (_req, res) => {
  res.status(404).json({ error: "not_found" });
});

// Production-safe error responses: never a stack trace, path or message from
// the underlying error. Only the error type and status are logged - body
// parser errors carry the raw request body, which can contain an OTP or an
// email address, so the error object itself is deliberately not logged.
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const status =
    typeof err?.status === "number" && err.status >= 400 && err.status < 500 ? err.status : 500;
  logger.error({ reqId: req.id, status, errType: err?.name }, "Request failed");
  if (res.headersSent) {
    next(err);
    return;
  }
  res.status(status).json({ error: status === 500 ? "internal_error" : "bad_request" });
};
app.use(errorHandler);

export default app;
