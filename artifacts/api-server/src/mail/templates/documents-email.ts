import { LOGO_CONTENT_ID } from "../logo";

export interface DocumentsEmailInput {
  publicSiteUrl: string;
}

const COMPANY_EMAIL = "info@skyline-holding-slu.com";
const GOLD = "#C7A86B";
const INK = "#080A0D";
const IVORY = "#F5F2EA";
const MUTED = "#9DA5AE";
const SERIF = "'Cormorant Garamond',Georgia,'Times New Roman',serif";
const SANS = "Inter,Arial,Helvetica,sans-serif";

export function renderDocumentsEmailHtml(_input: DocumentsEmailInput): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Your requested Skyline documents</title>
  </head>
  <body style="margin:0;padding:0;background-color:${IVORY};font-family:${SANS};">
    <span style="display:none;font-size:1px;color:${IVORY};line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
      Your requested Skyline documents are attached to this email.
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
              <td style="padding:0 40px;">
                <span style="display:inline-block;font-family:${SANS};font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:${GOLD};border:1px solid ${GOLD};padding:6px 12px;">Verified Delivery</span>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 40px 0;">
                <h1 style="margin:0;font-family:${SERIF};font-size:30px;line-height:36px;font-weight:600;color:${IVORY};">Your requested documents</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 40px 0;">
                <p style="margin:0 0 16px;font-family:${SANS};font-size:15px;line-height:24px;color:${IVORY};">Dear Recipient,</p>
                <p style="margin:0 0 16px;font-family:${SANS};font-size:15px;line-height:24px;color:${IVORY};">Thank you for verifying your email address.</p>
                <p style="margin:0 0 16px;font-family:${SANS};font-size:15px;line-height:24px;color:${IVORY};">Please find the requested Skyline documents attached to this email.</p>
                <p style="margin:0;font-family:${SANS};font-size:15px;line-height:24px;color:${IVORY};">Kind regards,<br />Skyline Holding</p>
              </td>
            </tr>
            <tr>
              <td style="padding:32px 40px 24px;">
                <p style="margin:0;padding-top:24px;border-top:1px solid #12304A;font-family:${SANS};font-size:12px;line-height:18px;color:${MUTED};">This email was sent following a verified document request. Questions? Write to <a href="mailto:${COMPANY_EMAIL}" style="color:${GOLD};text-decoration:underline;">${COMPANY_EMAIL}</a></p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function renderDocumentsEmailText(_input: DocumentsEmailInput): string {
  return [
    "SKYLINE HOLDING",
    "",
    "VERIFIED DELIVERY",
    "",
    "Your requested documents",
    "",
    "Dear Recipient,",
    "",
    "Thank you for verifying your email address.",
    "",
    "Please find the requested Skyline documents attached to this email.",
    "",
    "Kind regards,",
    "Skyline Holding",
    "",
    "This email was sent following a verified document request.",
    `Questions? Write to ${COMPANY_EMAIL}`,
  ].join("\n");
}
