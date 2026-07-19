import Link from "next/link";
import Button from "@/components/ui/Button";

export default function AdminQuickActions() {
  const actions = [
    {
      title: "إضافة طالب",
      href: "/admin/students/new",
    },
    {
      title: "إضافة معلم",
      href: "/admin/teachers/new",
    },
    {
      title: "إضافة جدول",
      href: "/admin/schedules/new",
    },
    {
      title: "إضافة تقرير",
      href: "/admin/reports/new",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 ">
  {actions.map((action) => (
    <Link
      key={action.href}
      href={action.href}
      className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md"
    >
      <h3 className="text-lg font-semibold">
        {action.title}
      </h3>

      <p className="mt-2 text-sm text-gray-500">
        اضغط لإضافة عنصر جديد
      </p>
    </Link>
  ))}
</div>
  );
}