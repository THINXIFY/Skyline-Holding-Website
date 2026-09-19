import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { AlertCircle, ArrowRight, Lock, X } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";
import { OtpCodeInput, type OtpCodeInputHandle } from "./OtpCodeInput";
import { AccessApiError, resendVerificationCode, startVerification, verifyCode } from "./accessApi";

type ModalState = "email" | "sending" | "otp" | "verifying" | "success" | "failure" | "retrying";

const RESEND_COOLDOWN_SECONDS = 60;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MSG = {
  invalid: "The verification code you entered is incorrect.",
  expired: "This verification code has expired. Please request a new code.",
  tooMany: "Too many incorrect attempts. Please request a new code.",
  rateLimited: "Too many requests. Please wait a while before trying again.",
  generic: "Something went wrong. Please try again.",
} as const;

/** Verify errors after which the server has discarded the challenge for good. */
const DEAD_CHALLENGE_ERRORS = new Set(["expired", "too_many_attempts", "not_found"]);

function mapVerifyError(error: unknown): string {
  if (!(error instanceof AccessApiError)) return MSG.generic;
  if (error.status === 429) return MSG.rateLimited;
  switch (error.code) {
    case "invalid_code":
      return MSG.invalid;
    case "expired":
    case "not_found":
      return MSG.expired;
    case "too_many_attempts":
      return MSG.tooMany;
    default:
      return MSG.generic;
  }
}

const primaryButton =
  "group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#C7A86B] px-6 py-3 font-[Inter] text-[13.5px] font-semibold text-[#080A0D] transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-[#D8BD82] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D8BD82] disabled:translate-y-0 disabled:opacity-60 disabled:hover:bg-[#C7A86B]";
const linkButton =
  "inline-flex min-h-11 items-center px-1 font-[Inter] text-[12px] font-semibold uppercase tracking-[0.12em] outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D8BD82]";
const eyebrow =
  "flex items-center gap-3 font-[Inter] text-[11.5px] font-semibold tracking-[0.16em] text-[#C7A86B]";
const heading =
  "mt-4 font-[Cormorant_Garamond] text-[clamp(30px,4.5vw,40px)] font-semibold leading-[1.05] text-[#F5F2EA]";

function ErrorMessage({ id, children }: { id: string; children: string }) {
  return (
    <p
      id={id}
      role="alert"
      className="mt-3 flex items-start gap-2 font-[Inter] text-[13.5px] leading-[1.45] text-[#F0A3A3]"
    >
      <AlertCircle className="mt-[1px] size-4 shrink-0" strokeWidth={1.8} aria-hidden />
      <span>{children}</span>
    </p>
  );
}

interface AccessVerificationModalProps {
  open: boolean;
  onClose: () => void;
}

export function AccessVerificationModal({ open, onClose }: AccessVerificationModalProps) {
  const [state, setState] = useState<ModalState>("email");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [requestId, setRequestId] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [otpError, setOtpError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [challengeDead, setChallengeDead] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const dialogRef = useRef<HTMLDivElement>(null);
  const otpRef = useRef<OtpCodeInputHandle>(null);
  const triggerFocusRef = useRef<HTMLElement | null>(null);
  // Synchronous guard against double-submits landing before React re-renders
  // the disabled state.
  const inFlightRef = useRef(false);

  useEffect(() => {
    if (open) {
      triggerFocusRef.current = document.activeElement as HTMLElement;
    } else {
      triggerFocusRef.current?.focus();
    }
  }, [open]);

  // Panel entrance, re-run on each state change (opacity only, never
  // visibility, so role="dialog" is never dropped from the a11y tree).
  useEffect(() => {
    if (!open || !dialogRef.current) return;
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set(dialogRef.current, { clearProps: "all" });
        return;
      }
      gsap.fromTo(
        dialogRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.45, ease: EASE.out3 },
      );
      if (state === "success") {
        gsap.fromTo(
          ".av-check",
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 0.6, ease: EASE.out3, delay: 0.25 },
        );
      }
    }, dialogRef);
    return () => ctx.revert();
  }, [open, state]);

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    // First input in the current view; otherwise the primary action. The
    // close (X) button is excluded so it never steals initial focus.
    const target =
      dialog.querySelector<HTMLElement>("input") ??
      dialog.querySelector<HTMLElement>(
        'button[data-autofocus], button[type="submit"]',
      );
    target?.focus();
  }, [open, state]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => {
      setCooldown((value) => {
        if (value - 1 === 0) setAnnouncement("You can now request a new code.");
        return value - 1;
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  function shake() {
    if (prefersReducedMotion() || !dialogRef.current) return;
    gsap.fromTo(
      dialogRef.current.querySelector("[role='group']"),
      { x: 0 },
      { x: 0, keyframes: { x: [-5, 5, -3, 3, 0] }, duration: 0.35, ease: "power1.inOut" },
    );
  }

  function resetAll() {
    setState("email");
    setEmail("");
    setEmailError(null);
    setRequestId(null);
    setCode("");
    setOtpError(null);
    setCooldown(0);
    setIsResending(false);
    setChallengeDead(false);
    setAnnouncement("");
    inFlightRef.current = false;
  }

  function handleClose() {
    if (state === "sending" || state === "verifying" || state === "retrying") return;
    resetAll();
    onClose();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      handleClose();
      return;
    }
    if (event.key === "Tab" && dialogRef.current) {
      const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
        "button:not([disabled]), [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex='-1'])",
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  async function beginChallenge(normalized: string): Promise<boolean> {
    try {
      const result = await startVerification(normalized);
      setEmail(normalized);
      setRequestId(result.requestId);
      setCode("");
      setOtpError(null);
      setChallengeDead(false);
      setCooldown(RESEND_COOLDOWN_SECONDS);
      setAnnouncement("A verification code has been sent.");
      return true;
    } catch (error) {
      setEmailError(
        error instanceof AccessApiError && error.status === 429
          ? MSG.rateLimited
          : "We could not send a verification code. Please try again.",
      );
      return false;
    }
  }

  async function handleEmailSubmit(event: FormEvent) {
    event.preventDefault();
    if (inFlightRef.current) return;
    const normalized = email.trim().toLowerCase();
    if (!EMAIL_PATTERN.test(normalized) || normalized.length > 254) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    inFlightRef.current = true;
    setEmailError(null);
    setState("sending");
    const ok = await beginChallenge(normalized);
    inFlightRef.current = false;
    setState(ok ? "otp" : "email");
  }

  async function handleVerifySubmit(event: FormEvent) {
    event.preventDefault();
    if (inFlightRef.current || !requestId || code.length !== 6) return;
    inFlightRef.current = true;
    setOtpError(null);
    setState("verifying");
    try {
      const result = await verifyCode(requestId, code);
      setState(result.status === "sent" ? "success" : "failure");
    } catch (error) {
      setOtpError(mapVerifyError(error));
      if (error instanceof AccessApiError && error.code && DEAD_CHALLENGE_ERRORS.has(error.code)) {
        // The server has discarded this challenge; "Resend Code" must start a
        // fresh one rather than hit the resend endpoint (which would 404).
        setChallengeDead(true);
        setCooldown(0);
      }
      setCode("");
      setState("otp");
      requestAnimationFrame(shake);
    } finally {
      inFlightRef.current = false;
    }
  }

  async function handleResend() {
    if (inFlightRef.current || !requestId || cooldown > 0 || isResending) return;
    inFlightRef.current = true;
    setIsResending(true);
    setOtpError(null);
    try {
      if (challengeDead) {
        await startFresh();
      } else {
        await resendVerificationCode(requestId);
        setCode("");
        setCooldown(RESEND_COOLDOWN_SECONDS);
        setAnnouncement("A new verification code has been sent.");
      }
      otpRef.current?.focusFirst();
    } catch (error) {
      setOtpError(
        error instanceof AccessApiError && error.status === 429
          ? MSG.rateLimited
          : error instanceof AccessApiError && error.code === "not_found"
            ? MSG.expired
            : "We could not resend the code. Please try again shortly.",
      );
      if (error instanceof AccessApiError && error.code === "not_found") setChallengeDead(true);
    } finally {
      setIsResending(false);
      inFlightRef.current = false;
    }
  }

  async function startFresh() {
    const result = await startVerification(email);
    setRequestId(result.requestId);
    setCode("");
    setChallengeDead(false);
    setCooldown(RESEND_COOLDOWN_SECONDS);
    setAnnouncement("A new verification code has been sent.");
  }

  function handleChangeEmail() {
    setState("email");
    setRequestId(null);
    setCode("");
    setOtpError(null);
    setCooldown(0);
    setChallengeDead(false);
  }

  async function handleTryAgain() {
    if (inFlightRef.current || !requestId) return;
    inFlightRef.current = true;
    setState("retrying");
    try {
      // Same challenge is already verified server-side: this retries delivery
      // idempotently without re-checking the code.
      const result = await verifyCode(requestId, code);
      setState(result.status === "sent" ? "success" : "failure");
    } catch {
      setState("failure");
    } finally {
      inFlightRef.current = false;
    }
  }

  if (!open) return null;

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto overscroll-contain bg-[#080A0D]/85 px-5 py-8 backdrop-blur-[3px] sm:items-center"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="access-heading"
        onKeyDown={handleKeyDown}
        className="relative my-auto w-full max-w-[560px] border border-[#C7A86B]/25 bg-[#0B1017] px-4 py-10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] min-[400px]:px-6 sm:p-12"
      >
        <button
          type="button"
          aria-label="Close dialog"
          data-testid="button-access-close"
          onClick={handleClose}
          className="absolute right-3 top-3 flex size-11 items-center justify-center text-[#9DA5AE] outline-none transition-colors duration-200 hover:text-[#F5F2EA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D8BD82]"
        >
          <X size={20} strokeWidth={1.5} aria-hidden />
        </button>

        <p role="status" aria-live="polite" className="sr-only">
          {announcement}
        </p>

        <img
          src="/images/skyline-logo.png"
          alt="Skyline Holding"
          className="mb-8 h-7 w-auto sm:h-8"
          draggable={false}
        />

        {(state === "email" || state === "sending") && (
          <form onSubmit={handleEmailSubmit} noValidate>
            <p className={eyebrow}>
              <span className="h-px w-8 bg-[#C7A86B]" aria-hidden />
              SECURE ACCESS
            </p>
            <h2 id="access-heading" className={heading}>
              Verify Your Access
            </h2>
            <p className="mt-4 font-[Inter] text-[15.5px] leading-[1.55] text-[#F5F2EA]/70">
              Enter your email address and we will send a verification code to continue securely.
            </p>

            <label
              htmlFor="access-email"
              className="mt-8 block font-[Inter] text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9DA5AE]"
            >
              Email address
            </label>
            <div
              className={`mt-2 flex items-center gap-3 border bg-[#080A0D] px-4 focus-within:border-[#C7A86B] focus-within:ring-2 focus-within:ring-[#C7A86B]/40 ${
                emailError ? "border-[#F0A3A3]" : "border-[#F5F2EA]/20"
              }`}
            >
              <Lock size={16} strokeWidth={1.5} className="shrink-0 text-[#C7A86B]" aria-hidden />
              <input
                id="access-email"
                data-testid="input-access-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="name@company.com"
                value={email}
                disabled={state === "sending"}
                aria-invalid={emailError ? true : undefined}
                aria-describedby={emailError ? "access-email-error" : undefined}
                onChange={(event) => setEmail(event.target.value)}
                className="min-h-12 w-full bg-transparent font-[Inter] text-[16px] text-[#F5F2EA] outline-none placeholder:text-[#9DA5AE]/60"
              />
            </div>
            {emailError && <ErrorMessage id="access-email-error">{emailError}</ErrorMessage>}

            <button
              type="submit"
              data-testid="button-access-send"
              disabled={state === "sending"}
              className={`${primaryButton} mt-8`}
            >
              {state === "sending" ? "Sending Code…" : "Send Verification Code"}
              {state !== "sending" && (
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  strokeWidth={2}
                  aria-hidden
                />
              )}
            </button>

            <p className="mt-5 font-[Inter] text-[12.5px] leading-[1.5] text-[#9DA5AE]">
              Your email address is used only to verify your request and deliver the requested documents.
            </p>
          </form>
        )}

        {(state === "otp" || state === "verifying") && (
          <form onSubmit={handleVerifySubmit} noValidate>
            <p className={eyebrow}>
              <span className="h-px w-8 bg-[#C7A86B]" aria-hidden />
              SECURE ACCESS
            </p>
            <h2 id="access-heading" className={heading}>
              Verify Your Access
            </h2>
            <p className="mt-4 font-[Inter] text-[15.5px] leading-[1.55] text-[#F5F2EA]/70">
              Enter the verification code sent to your registered contact details to continue securely.
            </p>
            <p className="mt-3 break-all font-[Inter] text-[13.5px] text-[#9DA5AE]">
              Sent to <span className="font-medium text-[#F5F2EA]">{email}</span>
            </p>

            <p
              id="access-code-label"
              className="mt-7 font-[Inter] text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9DA5AE]"
            >
              Verification code
            </p>
            <div className="mt-2">
              <OtpCodeInput
                ref={otpRef}
                value={code}
                onChange={setCode}
                disabled={state === "verifying"}
                invalid={Boolean(otpError)}
                errorId="access-otp-error"
                labelledBy="access-code-label"
              />
            </div>

            {otpError && <ErrorMessage id="access-otp-error">{otpError}</ErrorMessage>}

            <p className="mt-5 font-[Inter] text-[13px] leading-[1.5] text-[#9DA5AE]">
              Code not visible yet? Check your inbox first, then your spam, junk or promotions folder.
            </p>

            <button
              type="submit"
              data-testid="button-access-verify"
              disabled={state === "verifying" || code.length !== 6}
              className={`${primaryButton} mt-6`}
            >
              {state === "verifying" ? "Verifying…" : "Verify Code"}
              {state !== "verifying" && (
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  strokeWidth={2}
                  aria-hidden
                />
              )}
            </button>

            <div className="mt-4 flex items-center justify-between">
              <button
                type="button"
                data-testid="button-access-change-email"
                onClick={handleChangeEmail}
                disabled={state === "verifying"}
                className={`${linkButton} text-[#9DA5AE] hover:text-[#F5F2EA]`}
              >
                Change Email
              </button>
              <button
                type="button"
                data-testid="button-access-resend"
                onClick={handleResend}
                disabled={cooldown > 0 || isResending || state === "verifying"}
                className={`${linkButton} text-[#C7A86B] hover:text-[#D8BD82] disabled:text-[#9DA5AE]/70`}
              >
                {cooldown > 0 ? `Resend in ${cooldown}s` : isResending ? "Resending…" : "Resend Code"}
              </button>
            </div>
          </form>
        )}

        {state === "success" && (
          <div>
            <div className="mx-auto flex size-16 items-center justify-center rounded-full border border-[#C7A86B]">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  className="av-check"
                  d="M5 13l4 4L19 7"
                  pathLength={1}
                  strokeDasharray={1}
                  stroke="#C7A86B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className={`${eyebrow} mt-6 justify-center`}>VERIFICATION COMPLETE</p>
            <h2 id="access-heading" className={`${heading} text-center`}>
              Verification successful.
            </h2>
            <p className="mt-4 text-center font-[Inter] text-[15.5px] leading-[1.55] text-[#F5F2EA]/70">
              The requested documents have been sent to your verified email address.
            </p>
            <p className="mt-3 text-center font-[Inter] text-[13px] leading-[1.5] text-[#9DA5AE]">
              Please check your inbox first. If the email is not visible, review your spam, junk or promotions folder.
            </p>
            <button
              type="button"
              data-autofocus
              data-testid="button-access-close-success"
              onClick={handleClose}
              className={`${primaryButton} mt-8`}
            >
              Close
            </button>
          </div>
        )}

        {(state === "failure" || state === "retrying") && (
          <div>
            <h2 id="access-heading" className={heading.replace("mt-4 ", "")}>
              We couldn&rsquo;t send the documents
            </h2>
            <p className="mt-4 font-[Inter] text-[15.5px] leading-[1.55] text-[#F5F2EA]/70">
              Your verification was successful, but we were unable to complete document delivery. Please try again or
              contact Skyline.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                data-autofocus
                data-testid="button-access-try-again"
                onClick={handleTryAgain}
                disabled={state === "retrying"}
                className={primaryButton}
              >
                {state === "retrying" ? "Retrying…" : "Try Again"}
              </button>
              <a
                href="/contact"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[#F5F2EA]/30 px-6 py-3 font-[Inter] text-[13.5px] font-semibold text-[#F5F2EA] transition-colors duration-300 hover:border-[#C7A86B] hover:text-[#C7A86B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D8BD82]"
              >
                Contact Skyline
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
