"use client";

import { use } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { getStudentLinks } from "@/components/config/sidebar/student";
import StudentFooter from "@/components/students/StudentFooter";

export default function StudentLayout({ children, params }) {
  const { id } = use(params);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-row-reverse">
      <Sidebar
        title="أكاديمية الأدهم"
        subtitle="بوابة الطالب"
        links={getStudentLinks(id)}
      />

      <div className="flex min-h-screen flex-1 flex-col">
        <Header
          title="لوحة الطالب"
          userName="محمد أحمد"
          profileHref={`/students/${id}/profile`}
          notifications={5}
          messages={2}
        />
        <main className="flex-1 p-6">{children}</main>

        <StudentFooter />
      </div>
    </div>
  );
}
