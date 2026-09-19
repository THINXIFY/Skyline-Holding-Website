# Skyline Holding API server

Express API mounted at `/api`. Besides `GET /api/healthz` it serves the
email OTP verification flow that gates document delivery.

## OTP verification flow

Frontend: `artifacts/mockup-sandbox/src/components/mockups/_skyline/access/`
(opened from "Request Private Access" on the Investor Relations page).

| Endpoint | Body | Result |
| --- | --- | --- |
| `POST /api/request-info/start` | `{ email }` | `{ requestId }`; emails a 6-digit code |
| `POST /api/request-info/resend` | `{ requestId }` | `{ requestId }`; invalidates the old code, sends a new one (60 s cooldown) |
| `POST /api/request-info/verify` | `{ requestId, code }` | `{ status: "sent" \| "failed" }` or `{ error }` (`invalid_code`, `expired`, `too_many_attempts`, `not_found`) |

Protections: `crypto.randomInt` codes, HMAC-SHA256 hashing with `OTP_HASH_SECRET`,
constant-time comparison, expiry, max attempts, one-time use, resend cooldown,
per-email and per-IP rate limits, opaque request ids, delivery only to the
verified address, 15 kB body limit.

After a successful verification the PDFs listed in
`config/request-info-documents.ts` (files under `private/documents/`, never
served statically) are emailed to the verified address.

## Configuration

Copy `.env.example` and fill it in. `OTP_HASH_SECRET` is required in every
environment: the server refuses to start without it. In production it also
refuses to start unless `MAIL_PROVIDER=resend` (with `RESEND_API_KEY` and
`MAIL_FROM_EMAIL`) and `CORS_ALLOWED_ORIGINS` are set.

`MAIL_PROVIDER=console` (the default) logs emails, including the code, to the
server console instead of sending them. Local development only.

## Storage limitation

Challenges are stored in a JSON file (`REQUEST_INFO_DATA_DIR`, default `.data/`,
git-ignored). This is correct for a single instance with a persistent disk.
`OtpChallengeStore` is the seam for swapping in a database.

## Tests

`pnpm --filter @workspace/api-server run test`
