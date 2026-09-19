/**
 * Thin client for the api-server's OTP endpoints (/api/request-info/*).
 * The server is the sole authority on verification: the code is generated,
 * hashed, expiry- and attempt-checked there. Nothing here decides success.
 */

export class AccessApiError extends Error {
  constructor(
    readonly status: number,
    readonly code?: string,
  ) {
    super(code ?? `Request failed with status ${status}`);
    this.name = "AccessApiError";
  }
}

async function post<T>(path: string, body: Record<string, string>): Promise<T> {
  const response = await fetch(`/api/request-info/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  let data: unknown = null;
  try {
    data = await response.json();
  } catch {
    // Non-JSON error body (e.g. a proxy error page): fall through to the status.
  }

  if (!response.ok) {
    const code = (data as { error?: unknown } | null)?.error;
    throw new AccessApiError(response.status, typeof code === "string" ? code : undefined);
  }
  return data as T;
}

export function startVerification(email: string): Promise<{ requestId: string }> {
  return post("start", { email });
}

export function resendVerificationCode(requestId: string): Promise<{ requestId: string }> {
  return post("resend", { requestId });
}

export function verifyCode(requestId: string, code: string): Promise<{ status: "sent" | "failed" }> {
  return post("verify", { requestId, code });
}
