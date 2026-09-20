import { LOGO_CONTENT_ID } from "../logo";

export interface OtpEmailInput {
  code: string;
  ttlMinutes: number;
  publicSiteUrl: string;
}

const COMPANY_EMAIL = "info@skyline-holding-slu.com";
const GOLD = "#C7A86B";
const INK = "#080A0D";
const IVORY = "#F5F2EA";
const MUTED = "#9DA5AE";
const SERIF = "'Cormorant Garamond',Georgia,'Times New Roman',serif";
const SANS = "Inter,Arial,Helvetica,sans-serif";

export function renderOtpEmailHtml({ code, ttlMinutes }: OtpEmailInput): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Your Skyline Verification Code</title>
  </head>
  <body style="margin:0;padding:0;background-color:${IVORY};font-family:${SANS};">
    <span style="display:none;font-size:1px;color:${IVORY};line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
      Use the verification code below to continue securely.
    </span>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${IVORY};padding:32px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:${INK};max-width:600px;width:100%;">
            <tr>
              <td style="padding:32px 40px 24px;">
                <img src="cid:${LOGO_CONTENT_ID}" alt="Skyline Holding" width="200" height="33" style="display:block;border:0;" />
              </td>
            </tr>
            <tr>
              <td style="padding:0 40px 8px;">
                <p style="margin:0;font-family:${SANS};font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:${GOLD};">Secure Access</p>
              </td>
            </tr>
            <tr>
              <td style="padding:0 40px 12px;">
                <h1 style="margin:0;font-family:${SERIF};font-size:30px;line-height:36px;font-weight:600;color:${IVORY};">Your Skyline Verification Code</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:0 40px 24px;">
                <p style="margin:0;font-family:${SANS};font-size:15px;line-height:23px;color:${IVORY};">Use the verification code below to continue securely.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:0 40px 24px;">
                <div style="background-color:#0B1017;border:1px solid ${GOLD};padding:20px;text-align:center;">
                  <span style="font-family:${SANS};font-size:32px;letter-spacing:10px;font-weight:bold;color:${IVORY};">${code}</span>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:0 40px 8px;">
                <p style="margin:0;font-family:${SANS};font-size:13px;line-height:20px;color:${MUTED};">This code will expire in ${ttlMinutes} minutes.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:0 40px 32px;">
                <p style="margin:0;font-family:${SANS};font-size:13px;line-height:20px;color:${MUTED};">If you did not request this code, you can ignore this message.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:0 40px 32px;">
                <p style="margin:0;font-family:${SANS};font-size:13px;line-height:20px;color:${MUTED};">Questions? Write to <a href="mailto:${COMPANY_EMAIL}" style="color:${GOLD};text-decoration:underline;">${COMPANY_EMAIL}</a></p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 40px;border-top:1px solid #12304A;">
                <p style="margin:0;font-family:${SANS};font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${GOLD};">Skyline Holding</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function renderOtpEmailText({ code, ttlMinutes }: OtpEmailInput): string {
  return [
    "SKYLINE HOLDING",
    "",
    "YOUR SKYLINE VERIFICATION CODE",
    "",
    "Use the verification code below to continue securely.",
    "",
    code,
    "",
    `This code will expire in ${ttlMinutes} minutes.`,
    "",
    "If you did not request this code, you can ignore this message.",
    "",
    `Questions? Write to ${COMPANY_EMAIL}`,
  ].join("\n");
}
