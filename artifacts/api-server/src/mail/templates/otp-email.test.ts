import { describe, expect, it } from "vitest";
import { renderOtpEmailHtml, renderOtpEmailText } from "./otp-email";

const input = { code: "384271", ttlMinutes: 10, publicSiteUrl: "https://example.com" };

describe("otp email template", () => {
  it("html includes the code and expiry", () => {
    const html = renderOtpEmailHtml(input);
    expect(html).toContain("384271");
    expect(html).toContain("10 minutes");
    expect(html).toContain("Your Skyline Verification Code");
    expect(html).toContain("Use the verification code below to continue securely.");
    expect(html).toContain("If you did not request this code, you can ignore this message.");
    expect(html).not.toMatch(/dcl/i);
    expect(html).toContain("mailto:info@skyline-holding-slu.com");
    expect(renderOtpEmailText(input)).toContain("info@skyline-holding-slu.com");
  });

  it("text version includes the same essentials", () => {
    const text = renderOtpEmailText(input);
    expect(text).toContain("384271");
    expect(text).toContain("10 minutes");
  });

  it("only ever shows the official company email, and invents no phone number or office hours", () => {
    const html = renderOtpEmailHtml(input).toLowerCase();
    const addresses = html.match(/[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,}/g) ?? [];
    expect(new Set(addresses)).toEqual(new Set(["info@skyline-holding-slu.com"]));
    expect(html).not.toContain("office hours");
    expect(html).not.toMatch(/tel:|\+\d{6,}/);
  });

  it("never mentions attachments (the OTP email must not carry PDFs)", () => {
    const html = renderOtpEmailHtml(input).toLowerCase();
    expect(html).not.toContain("attach");
  });

  it("references the logo via cid, not a remote URL", () => {
    const html = renderOtpEmailHtml(input);
    expect(html).toContain('src="cid:skyline-logo"');
    expect(html).not.toContain("images/brand/skyline-logo.png");
  });
});
