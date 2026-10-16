import { useEffect } from "react";

/**
 * Marks the current page "noindex, nofollow" for as long as it is mounted.
 * The production Nginx also sends the same directive as an X-Robots-Tag header
 * for these routes (the reliable signal); this covers dev and any crawler that
 * only reads the rendered DOM.
 */
export function useNoIndex(): void {
  useEffect(() => {
    let meta = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const created = !meta;
    const previous = meta?.content ?? null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "robots";
      document.head.appendChild(meta);
    }
    meta.content = "noindex, nofollow";

    return () => {
      if (!meta) return;
      if (created) meta.remove();
      else if (previous !== null) meta.content = previous;
    };
  }, []);
}
