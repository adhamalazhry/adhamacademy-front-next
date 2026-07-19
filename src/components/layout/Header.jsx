import Link from "next/link";

export default function Header({
  title,
  userName,
  profileHref = "#",
  notifications = 0,
  messages = 0,
}) {
  return (
    <header className="flex items-center justify-between border-b bg-white px-6 py-4">
      {/* عنوان الصفحة */}
      <h1 className="text-2xl font-bold text-slate-900">
        {title}
      </h1>

      {/* المستخدم */}
      <div className="flex items-center gap-6">
        <button className="relative text-2xl">
          🔔
          {notifications > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {notifications}
            </span>
          )}
        </button>

        <button className="relative text-2xl">
          💬
          {messages > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {messages}
            </span>
          )}
        </button>

        <Link
          href={profileHref}
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
            👤
          </div>

          <span className="font-semibold">
            {userName}
          </span>
        </Link>
      </div>
    </header>
  );
}