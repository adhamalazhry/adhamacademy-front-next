import Link from "next/link";

const studentLinks = [
  {
    title: "ملفي الشخصي",
    href: "profile",
    icon: "👤",
  },
  {
    title: "تقارير الحصص",
    href: "reports",
    icon: "📄",
  },
  
];

export default function StudentSidebar({ id }) {
  return (
   <aside className="w-auto shrink-0 bg-white border-l px-5 py-6">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-800">
          لوحة الطالب
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          إدارة بيانات الطالب وتقاريره
        </p>
      </div>

      <nav className="flex flex-col gap-2">
        {studentLinks.map((link) => (
          <Link
            key={link.href}
            href={`/students/${id}/${link.href}`}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-700 transition"
          >
           

            <span>{link.title}</span>
             <span className="text-xl">{link.icon}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}