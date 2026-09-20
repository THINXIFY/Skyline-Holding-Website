import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { findPackageRoot, loadEnabledDocuments } from "./documents";
import type { RequestInfoDocument } from "../../config/request-info-documents";

let dir: string;

beforeEach(async () => {
  dir = await mkdtemp(path.join(tmpdir(), "docs-test-"));
  await writeFile(path.join(dir, "a.pdf"), "pdf-a-content");
});

afterEach(async () => {
  await rm(dir, { recursive: true, force: true });
});

describe("loadEnabledDocuments", () => {
  it("loads only enabled documents", async () => {
    const manifest: RequestInfoDocument[] = [
      { id: "a", filename: "A.pdf", filePath: "a.pdf", enabled: true },
      { id: "b", filename: "B.pdf", filePath: "b.pdf", enabled: false },
    ];
    const loaded = await loadEnabledDocuments(manifest, dir);
    expect(loaded).toHaveLength(1);
    expect(loaded[0].filename).toBe("A.pdf");
  });

  it("uses the manifest's human-readable filename, not the internal path", async () => {
    const manifest: RequestInfoDocument[] = [
      { id: "a", filename: "Skyline-Company-Profile.pdf", filePath: "a.pdf", enabled: true },
    ];
    const loaded = await loadEnabledDocuments(manifest, dir);
    expect(loaded[0].filename).toBe("Skyline-Company-Profile.pdf");
  });

  it("skips a missing file without throwing", async () => {
    const manifest: RequestInfoDocument[] = [
      { id: "missing", filename: "Missing.pdf", filePath: "missing.pdf", enabled: true },
      { id: "a", filename: "A.pdf", filePath: "a.pdf", enabled: true },
    ];
    const loaded = await loadEnabledDocuments(manifest, dir);
    expect(loaded).toHaveLength(1);
    expect(loaded[0].filename).toBe("A.pdf");
  });

  it("rejects a path that escapes the documents root", async () => {
    const manifest: RequestInfoDocument[] = [
      { id: "escape", filename: "Escape.pdf", filePath: "../escape.pdf", enabled: true },
    ];
    await expect(loadEnabledDocuments(manifest, dir)).rejects.toThrow(/outside/);
  });

  it("rejects a non-PDF file even if enabled", async () => {
    await writeFile(path.join(dir, "c.txt"), "not a pdf");
    const manifest: RequestInfoDocument[] = [{ id: "c", filename: "C.pdf", filePath: "c.txt", enabled: true }];
    await expect(loadEnabledDocuments(manifest, dir)).rejects.toThrow(/PDF/);
  });

  it("resolves the package root the same way from both a src-depth and a dist-depth starting point", async () => {
    // Simulates the exact bundling hazard DOCUMENTS_ROOT's real
    // implementation guards against: esbuild collapses import.meta.dirname
    // to the bundle's own (shallower) location, so the root-finding logic
    // must land on the same package.json regardless of how deep the
    // calling module happens to live.
    await writeFile(path.join(dir, "package.json"), "{}");
    const srcLib = path.join(dir, "src", "lib");
    const dist = path.join(dir, "dist");
    await mkdir(srcLib, { recursive: true });
    await mkdir(dist, { recursive: true });

    expect(findPackageRoot(srcLib)).toBe(dir);
    expect(findPackageRoot(dist)).toBe(dir);
  });
});

describe("production document manifest", () => {
  it("loads EVERY enabled document from the real private directory, each a real PDF", async () => {
    const { requestInfoDocuments } = await import("../../config/request-info-documents");
    const enabled = requestInfoDocuments.filter((doc) => doc.enabled);
    expect(enabled.length).toBeGreaterThan(0);

    const loaded = await loadEnabledDocuments();
    // Nothing silently skipped: one loaded file per enabled manifest entry, same order.
    expect(loaded.map((doc) => doc.filename)).toEqual(enabled.map((doc) => doc.filename));
    for (const doc of loaded) {
      expect(doc.content.subarray(0, 5).toString("latin1"), doc.filename).toBe("%PDF-");
      expect(doc.content.byteLength, doc.filename).toBeGreaterThan(10_000);
    }
  });

  it("has unique ids and unique attachment names, and stays under the attachment size cap", async () => {
    const { requestInfoDocuments } = await import("../../config/request-info-documents");
    const ids = requestInfoDocuments.map((doc) => doc.id);
    const names = requestInfoDocuments.map((doc) => doc.filename);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(names).size).toBe(names.length);

    const loaded = await loadEnabledDocuments();
    const total = loaded.reduce((sum, doc) => sum + doc.content.byteLength, 0);
    expect(total).toBeLessThan(35 * 1024 * 1024);
  });

  it("includes the company registration certificate", async () => {
    const [first] = await loadEnabledDocuments();
    expect(first.filename).toBe("SKYLINE_HOLDING_Registry.pdf");
  });

  it("is byte-identical to the copy the website publishes, so site and email never disagree", async () => {
    const { readFile } = await import("node:fs/promises");
    const website = await readFile(
      path.join(findPackageRoot(import.meta.dirname), "..", "mockup-sandbox", "public", "documents", "SKYLINE_HOLDING_Registry.pdf"),
    );
    const emailed = (await loadEnabledDocuments()).find((doc) => doc.filename === "SKYLINE_HOLDING_Registry.pdf");
    expect(emailed?.content.equals(website)).toBe(true);
  });
});
