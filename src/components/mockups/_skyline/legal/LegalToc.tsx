import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export interface TocItem {
  id: string;
  label: string;
}

/**
 * Section navigation for long legal pages. Renders as a sticky scroll-spy
 * list on desktop and a collapsible <details> block on mobile, so the page
 * never becomes a single unstructured wall of text.
 */
export function LegalToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 },
    );
    const els = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <>
      <nav
        aria-label="Table of contents"
        className="lt-toc hidden lg:sticky lg:top-32 lg:col-span-3 lg:block lg:self-start"
      >
        <p className="font-[Inter] text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9DA5AE]">
          On This Page
        </p>
        <ul className="mt-4 space-y-0.5 border-l border-[#12161B]/10">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block border-l-2 py-1.5 pl-4 font-[Inter] text-[12.5px] leading-[1.4] transition-colors duration-300 ${
                  active === item.id
                    ? "border-[#C7A86B] font-semibold text-[#12161B]"
                    : "border-transparent text-[#12161B]/50 hover:text-[#12161B]/80"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <details className="group mb-10 border border-[#12161B]/12 bg-white/50 lg:hidden">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between px-5 py-4 font-[Inter] text-[12px] font-semibold uppercase tracking-[0.12em] text-[#12161B]">
          On This Page
          <ChevronDown
            className="text-[#C7A86B] transition-transform duration-300 group-open:rotate-180"
            size={16}
            strokeWidth={2}
            aria-hidden
          />
        </summary>
        <ul className="space-y-1 px-5 pb-5">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="flex min-h-11 items-center font-[Inter] text-[13.5px] text-[#12161B]/70"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </details>
    </>
  );
}
