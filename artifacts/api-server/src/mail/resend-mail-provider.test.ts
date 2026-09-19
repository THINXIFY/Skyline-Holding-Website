import { afterEach, describe, expect, it, vi } from "vitest";
import { ResendMailProvider } from "./resend-mail-provider";

const send = vi.fn();

vi.mock("resend", () => ({
  Resend: class {
    emails = { send };
  },
}));

describe("ResendMailProvider", () => {
  afterEach(() => {
    send.mockReset();
  });

  it("sends from and replies-to the configured from-address", async () => {
    send.mockResolvedValue({ data: { id: "email-id" }, error: null });
    const provider = new ResendMailProvider("re_test_key", "no-reply@example.com", "Skyline Holding");

    await provider.sendMail({ to: "visitor@example.com", subject: "Subject", html: "<p>hi</p>", text: "hi" });

    expect(send).toHaveBeenCalledWith(
      expect.objectContaining({
        from: "Skyline Holding <no-reply@example.com>",
        replyTo: "no-reply@example.com",
        to: "visitor@example.com",
      }),
    );
  });

  it("throws when Resend reports an error", async () => {
    send.mockResolvedValue({ data: null, error: { message: "domain not verified" } });
    const provider = new ResendMailProvider("re_test_key", "no-reply@example.com", "Skyline Holding");

    await expect(
      provider.sendMail({ to: "visitor@example.com", subject: "Subject", html: "<p>hi</p>", text: "hi" }),
    ).rejects.toThrow(/domain not verified/);
  });

  it("embeds the Skyline logo as an inline attachment referenced by cid:skyline-logo", async () => {
    send.mockResolvedValue({ data: { id: "email-id" }, error: null });
    const provider = new ResendMailProvider("re_test_key", "no-reply@example.com", "Skyline Holding");

    await provider.sendMail({ to: "visitor@example.com", subject: "Subject", html: "<p>hi</p>", text: "hi" });

    const call = send.mock.calls[0][0];
    const logoAttachment = call.attachments.find((a: { inlineContentId?: string }) => a.inlineContentId === "skyline-logo");
    expect(logoAttachment).toBeDefined();
    expect(logoAttachment.filename).toBe("skyline-logo.png");
    expect(Buffer.isBuffer(logoAttachment.content)).toBe(true);
    expect(logoAttachment.content.length).toBeGreaterThan(0);
  });

  it("keeps document attachments alongside the inline logo, without an inlineContentId", async () => {
    send.mockResolvedValue({ data: { id: "email-id" }, error: null });
    const provider = new ResendMailProvider("re_test_key", "no-reply@example.com", "Skyline Holding");

    await provider.sendMail({
      to: "visitor@example.com",
      subject: "Subject",
      html: "<p>hi</p>",
      text: "hi",
      attachments: [{ filename: "Skyline-Company-Profile.pdf", content: Buffer.from("pdf-bytes") }],
    });

    const call = send.mock.calls[0][0];
    expect(call.attachments).toHaveLength(2);
    const pdfAttachment = call.attachments.find((a: { filename: string }) => a.filename === "Skyline-Company-Profile.pdf");
    expect(pdfAttachment.inlineContentId).toBeUndefined();
  });
});
