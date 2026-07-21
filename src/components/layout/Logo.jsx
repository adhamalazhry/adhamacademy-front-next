import Link from "next/link";
import Image from "next/image";

export default function Logo({
  src,
  title = "أكاديمية الأدهم",
  subtitle = "لوحة التحكم",
  href = "/",
}) {
  const hasLogo = Boolean(src);

  return (
    <Link
      href={href}
      className="group flex items-center gap-3 text-right"
    >
      <div className="relative h-12 w-12 overflow-hidden rounded-3xl bg-slate-100 ring-1 ring-slate-200">
        {hasLogo ? (
          <Image
            src={src}
            alt={title}
            fill
            className="object-cover"
            sizes="48px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-lg text-slate-500">
            🎓
          </div>
        )}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 transition group-hover:text-slate-700">
          {subtitle}
        </p>
        <h2 className="truncate text-base font-semibold text-slate-900">
          {title}
        </h2>
      </div>
    </Link>
  );
}
