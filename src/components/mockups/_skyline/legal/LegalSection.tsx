import type { ReactNode } from "react";

export function LegalSection({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="ls-section scroll-mt-28 border-t border-[#12161B]/10 py-9 first:border-t-0 first:pt-0 md:py-10"
    >
      <div className="flex items-baseline gap-3.5">
        <span className="font-[Inter] text-[12.5px] font-semibold text-[#C7A86B]">{number}</span>
        <h2 className="font-[Cormorant_Garamond] text-[23px] font-semibold leading-[1.15] text-[#12161B] md:text-[26px]">
          {title}
        </h2>
      </div>
      <div className="mt-4 max-w-[66ch] space-y-3.5 font-[Inter] text-[14.5px] leading-[1.65] text-[#12161B]/70">
        {children}
      </div>
    </section>
  );
}

export function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 pl-5">
      {items.map((item) => (
        <li key={item} className="list-disc marker:text-[#C7A86B]">
          {item}
        </li>
      ))}
    </ul>
  );
}
