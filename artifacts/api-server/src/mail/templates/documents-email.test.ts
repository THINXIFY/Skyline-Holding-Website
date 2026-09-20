import { describe, expect, it } from "vitest";
import { renderDocumentsEmailHtml, renderDocumentsEmailText } from "./documents-email";

const input = { publicSiteUrl: "https://example.com" };

describe("documents email template", () => {
  it("html includes the verified-delivery badge and company name", () => {
    const html = renderDocumentsEmailHtml(input);
    expect(html).toContain("Verified Delivery");
    expect(html).toContain("Skyline Holding");
  });

  it("carries the official company email in both versions", () => {
    expect(renderDocumentsEmailHtml(input)).toContain("mailto:info@skyline-holding-slu.com");
    expect(renderDocumentsEmailText(input)).toContain("info@skyline-holding-slu.com");
  });

  it("text version carries the same core copy", () => {
    const text = renderDocumentsEmailText(input);
    expect(text).toContain("Your requested documents");
    expect(text).toContain("Skyline Holding");
  });

  it("only ever shows the official company email, and invents no phone number or office hours", () => {
    const html = renderDocumentsEmailHtml(input).toLowerCase();
    const addresses = html.match(/[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,}/g) ?? [];
    expect(new Set(addresses)).toEqual(new Set(["info@skyline-holding-slu.com"]));
    expect(html).not.toContain("office hours");
    expect(html).not.toMatch(/tel:|\+\d{6,}/);
  });

  it("references the logo via cid, not a remote URL", () => {
    const html = renderDocumentsEmailHtml(input);
    expect(html).toContain('src="cid:skyline-logo"');
    expect(html).not.toContain("images/brand/skyline-logo.png");
  });
});
