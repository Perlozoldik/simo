import { cn, initials } from "@/lib/utils";

export function Avatar({
  name,
  src,
  size = 36,
  className,
}: {
  name: string;
  src?: string;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-full overflow-hidden bg-gradient-to-br from-brand-500/30 to-violet-500/30 border border-white/10 text-xs font-semibold",
        className
      )}
      style={{ width: size, height: size }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={name} className="h-full w-full object-cover" />
      ) : (
        <span>{initials(name || "U")}</span>
      )}
    </div>
  );
}
