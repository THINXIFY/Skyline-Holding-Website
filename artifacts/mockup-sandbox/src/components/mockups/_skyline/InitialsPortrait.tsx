function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/**
 * Elegant neutral portrait placeholder for people without a verified photo
 * on file. Deliberately not a generic silhouette or stock photo — an
 * initials treatment that fits the site's dark / gold visual language.
 */
export function InitialsPortrait({ name, className = "" }: { name: string; className?: string }) {
  return (
    <div
      className={`relative flex size-full items-center justify-center overflow-hidden bg-[#0B1017] ${className}`}
      role="img"
      aria-label={`Portrait placeholder for ${name}`}
    >
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 20%, #C7A86B 0%, transparent 55%), radial-gradient(circle at 80% 85%, #C7A86B 0%, transparent 45%)",
        }}
        aria-hidden
      />
      <div className="absolute inset-0 border border-[#C7A86B]/15" aria-hidden />
      <span className="relative font-[Cormorant_Garamond] text-[clamp(38px,5vw,56px)] font-semibold tracking-[0.04em] text-[#D8BD82]/85">
        {getInitials(name)}
      </span>
    </div>
  );
}
