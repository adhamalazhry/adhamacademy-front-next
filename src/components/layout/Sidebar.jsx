import Link from "next/link";
import Image from "next/image";

export default function Sidebar({
  title,
  subtitle,
  logo = "/logo.png",
  links,
  helpBox,
}) {
  return (
    <aside className="h-screen w-72 shrink-0 border-l border-gray-200 bg-white px-6 py-6">
      {/* Logo */}
      <div className="mb-8 flex items-center justify-center gap-3 border-b pb-6">
        <Image
          src={logo}
          alt={title}
          width={50}
          height={50}
          className="rounded-lg"
        />

        <Link href="/">
          <div className="cursor-pointer text-right group">
            <h2 className="text-xl font-bold text-slate-900 transition group-hover:text-blue-600">
              {title}
            </h2>

            <p className="text-sm text-slate-500 transition group-hover:text-blue-500">
              {subtitle}
            </p>
          </div>
        </Link>
      </div>

      {/* Links */}
      <nav className="space-y-3">
        {links.map((link) => (
          <Link
            key={link.title}
            href={link.href}
            className="relative flex items-center justify-between rounded-xl px-4 py-3 text-slate-800 transition hover:bg-blue-50 hover:text-blue-600"
          >
            <span className="text-2xl">{link.icon}</span>

            <span className="text-lg font-semibold">
              {link.title}
            </span>

            {link.badge && (
              <span className="absolute right-7 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {link.badge}
              </span>
            )}
          </Link>
        ))}
      </nav>

      {/* Help */}
      {helpBox && (
        <div className="mt-10 border-t pt-6">
          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
            <div className="flex items-center gap-3">
              <div className="text-3xl">{helpBox.icon}</div>

              <div className="text-right">
                <h3 className="font-bold text-slate-900">
                  {helpBox.title}
                </h3>

                <p className="text-sm text-slate-500">
                  {helpBox.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}