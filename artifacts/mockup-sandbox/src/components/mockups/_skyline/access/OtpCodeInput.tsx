import { forwardRef, useImperativeHandle, useRef, type ClipboardEvent, type KeyboardEvent } from "react";

interface OtpCodeInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  invalid?: boolean;
  /** id of the element that describes the error, wired to every box. */
  errorId?: string;
  labelledBy?: string;
}

export interface OtpCodeInputHandle {
  focusFirst: () => void;
}

export const OtpCodeInput = forwardRef<OtpCodeInputHandle, OtpCodeInputProps>(function OtpCodeInput(
  { length = 6, value, onChange, disabled = false, invalid = false, errorId, labelledBy },
  ref,
) {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const digits = Array.from({ length }, (_, i) => value[i] ?? "");

  useImperativeHandle(ref, () => ({ focusFirst: () => inputRefs.current[0]?.focus() }));

  function setDigit(index: number, digit: string) {
    const next = digits.slice();
    next[index] = digit;
    onChange(next.join("").slice(0, length));
  }

  function handleChange(index: number, raw: string) {
    const digit = raw.replace(/\D/g, "").slice(-1);
    setDigit(index, digit);
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      setDigit(index - 1, "");
    } else if (event.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (event.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handlePaste(event: ClipboardEvent<HTMLInputElement>) {
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "");
    if (!pasted) return;
    event.preventDefault();
    onChange(pasted.slice(0, length));
    const lastFilled = Math.min(pasted.length, length) - 1;
    inputRefs.current[Math.max(lastFilled, 0)]?.focus();
  }

  return (
    <div className="flex gap-1 min-[400px]:gap-2" role="group" aria-labelledby={labelledBy}>
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          data-testid={`otp-digit-${index}`}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          maxLength={1}
          value={digit}
          disabled={disabled}
          aria-label={`Digit ${index + 1} of ${length}`}
          aria-invalid={invalid || undefined}
          aria-describedby={invalid && errorId ? errorId : undefined}
          onChange={(event) => handleChange(index, event.target.value)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={handlePaste}
          onFocus={(event) => event.target.select()}
          className={`h-14 min-w-0 flex-1 border bg-[#080A0D] text-center font-[Inter] text-[22px] font-semibold text-[#F5F2EA] outline-none transition-[border-color,box-shadow] duration-200 focus-visible:border-[#C7A86B] focus-visible:ring-2 focus-visible:ring-[#C7A86B]/60 disabled:opacity-50 sm:h-16 ${
            invalid ? "border-[#F0A3A3]" : "border-[#F5F2EA]/20"
          }`}
        />
      ))}
    </div>
  );
});
