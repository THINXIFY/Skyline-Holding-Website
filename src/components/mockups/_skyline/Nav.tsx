import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { navItems, type NavItem } from "./data";
import { gsap, EASE, prefersReducedMotion } from "./gsap";

function getCurrentPath(): string {
  if (typeof window === "undefined") return "/";
  return window.location.pathname.replace(/\/+$/, "") || "/";
}

/** Only real, distinct routes count toward a dropdown parent's active state
 *  hash-only anchors (e.g. "/#contact") all resolve to "/" and would
 *  otherwise falsely light up "Investments" while just browsing the homepage. */
function isRouteMatch(href: string, currentPath: string): boolean {
  if (href.includes("#")) return false;
  return href.replace(/\/+$/, "") === currentPath;
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const [currentPath] = useState(getCurrentPath);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Close any open dropdown on outside click and on Escape.
  useEffect(() => {
    if (!openDropdown) return;
    const handleClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement)?.closest?.("[data-nav-group]")) setOpenDropdown(null);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenDropdown(null);
    };
    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [openDropdown]);

  // Lock body scroll while the mobile menu is open, and stagger the items in.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    if (mobileOpen && mobilePanelRef.current && !prefersReducedMotion()) {
      gsap.fromTo(
        mobilePanelRef.current.querySelectorAll(".mnav-item"),
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: EASE.out3, delay: 0.1 },
      );
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const openWithIntent = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(label);
  };
  const closeWithIntent = () => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 180);
  };

  const isItemActive = (item: NavItem) =>
    (item.href ? isRouteMatch(item.href, currentPath) : false) ||
    (item.children?.some((c) => isRouteMatch(c.href, currentPath)) ?? false);

  return (
    <>
      <div ref={sentinelRef} className="absolute top-16 h-px w-full" aria-hidden />

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,padding,border-color] duration-500 ${
          scrolled || mobileOpen
            ? "border-b border-white/10 bg-[#080A0D]/85 py-3 backdrop-blur-md"
            : "border-b border-transparent bg-transparent py-5"
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-6 md:px-10"
        >
          <a
            href="/"
            className="shrink-0 transition-opacity duration-300 hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C7A86B]"
          >
            <img
              src="/images/skyline-logo.png"
              alt="Skyline Holding"
              width={2041}
              height={333}
              fetchPriority="high"
              className="h-auto w-[148px] object-contain sm:w-[170px] lg:w-[190px]"
            />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const active = isItemActive(item);

              if (!item.children) {
                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`group relative inline-flex items-center px-4 py-2.5 font-[Inter] text-[13px] font-medium tracking-[0.02em] transition-colors duration-300 hover:text-[#D8BD82] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C7A86B] ${
                        active ? "text-[#D8BD82]" : "text-[#F8F7F3]/80"
                      }`}
                    >
                      {item.label}
                      <span
                        className={`absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-[#D8BD82] transition-transform duration-300 group-hover:scale-x-100 ${
                          active ? "scale-x-100" : ""
                        }`}
                        aria-hidden
                      />
                    </a>
                  </li>
                );
              }

              const isOpen = openDropdown === item.label;
              return (
                <li
                  key={item.label}
                  data-nav-group
                  className="relative"
                  onMouseEnter={() => openWithIntent(item.label)}
                  onMouseLeave={closeWithIntent}
                >
                  <button
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    onClick={() => setOpenDropdown(isOpen ? null : item.label)}
                    className={`group relative inline-flex items-center gap-1.5 px-4 py-2.5 font-[Inter] text-[13px] font-medium tracking-[0.02em] transition-colors duration-300 hover:text-[#D8BD82] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C7A86B] ${
                      active || isOpen ? "text-[#D8BD82]" : "text-[#F8F7F3]/80"
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      className={`size-3 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      strokeWidth={2}
                      aria-hidden
                    />
                    <span
                      className={`absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-[#D8BD82] transition-transform duration-300 group-hover:scale-x-100 ${
                        active ? "scale-x-100" : ""
                      }`}
                      aria-hidden
                    />
                  </button>

                  <div
                    role="menu"
                    aria-label={item.label}
                    className={`absolute left-0 top-full w-[248px] pt-3 transition-all duration-250 ease-out ${
                      isOpen
                        ? "visible translate-y-0 opacity-100"
                        : "invisible -translate-y-2 opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden rounded-[4px] border border-white/10 bg-[#0B1017]/98 shadow-[0_24px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                      <span className="block h-px w-full bg-gradient-to-r from-[#C7A86B]/70 via-[#C7A86B]/20 to-transparent" aria-hidden />
                      <ul className="p-2">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <a
                              href={child.href}
                              role="menuitem"
                              onClick={() => setOpenDropdown(null)}
                              className="block rounded-[3px] border-l-2 border-transparent px-4 py-3 font-[Inter] text-[13.5px] text-[#F5F2EA]/85 transition-all duration-200 hover:border-[#C7A86B] hover:bg-white/[0.04] hover:text-[#D8BD82]"
                            >
                              {child.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="flex shrink-0 items-center gap-3">
            <a
              href="/contact"
              className="group hidden items-center gap-2 rounded-full bg-[#C7A86B] px-5 py-2.5 font-[Inter] text-[12.5px] font-semibold tracking-[0.02em] text-[#12161B] transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C7A86B] lg:inline-flex"
            >
              Partner With Us
              <ArrowRight
                className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={2}
                aria-hidden
              />
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="flex size-11 items-center justify-center text-[#F8F7F3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C7A86B] lg:hidden"
            >
              {mobileOpen ? (
                <X className="size-6" strokeWidth={1.5} aria-hidden />
              ) : (
                <Menu className="size-6" strokeWidth={1.5} aria-hidden />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Rendered as a header sibling so the header's own backdrop-blur
          doesn't create a containing block that would break this panel's
          fixed positioning. */}
      {mobileOpen && (
        <div
          ref={mobilePanelRef}
          className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-[#080A0D] px-6 pb-10 pt-8 lg:hidden"
        >
          <span className="mnav-item mb-8 block h-px w-full bg-white/10" aria-hidden />
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => {
              if (!item.children) {
                const active = isItemActive(item);
                return (
                  <li key={item.label} className="mnav-item border-b border-white/10">
                    <a
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`flex min-h-[56px] items-center font-[Inter] text-[22px] font-medium tracking-[-0.01em] ${
                        active ? "text-[#D8BD82]" : "text-[#F8F7F3]/90"
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              }

              const expanded = mobileExpanded === item.label;
              const active = isItemActive(item);
              return (
                <li key={item.label} className="mnav-item border-b border-white/10">
                  <button
                    type="button"
                    onClick={() => setMobileExpanded(expanded ? null : item.label)}
                    aria-expanded={expanded}
                    className={`flex min-h-[56px] w-full items-center justify-between font-[Inter] text-[22px] font-medium tracking-[-0.01em] ${
                      active ? "text-[#D8BD82]" : "text-[#F8F7F3]/90"
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      className={`size-5 text-[#9DA5AE] transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                      strokeWidth={1.75}
                      aria-hidden
                    />
                  </button>
                  <div
                    className="grid transition-[grid-template-rows] duration-400 ease-out"
                    style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <ul className="flex flex-col gap-1 pb-5 pl-4">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <a
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                              className="flex min-h-[48px] items-center font-[Inter] text-[16px] font-medium text-[#F5F2EA]/75 transition-colors hover:text-[#D8BD82]"
                            >
                              {child.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <a
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="mnav-item mt-9 flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-[#C7A86B] px-6 font-[Inter] text-[14px] font-semibold text-[#12161B]"
          >
            Partner With Us
            <ArrowRight className="size-4" strokeWidth={2} aria-hidden />
          </a>
        </div>
      )}
    </>
  );
}
