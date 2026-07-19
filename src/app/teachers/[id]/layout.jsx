"use client";

import { use } from "react";

import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

import { getTeacherLinks } from "@/components/config/sidebar/teacher";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function TeacherLayout({ children, params }) {
  const { id } = use(params);
const { data: teacher, error, isLoading } = useSWR(
    `http://localhost:3001/teachers/${id}`,
    fetcher
  );

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error loading data</p>;
  return (
    <div className="min-h-screen bg-gray-50 flex flex-row-reverse">
      <Sidebar
        title="أكاديمية الأدهم"
        subtitle="بوابة المعلم"
        links={getTeacherLinks(id)}
      />

      <div className="flex min-h-screen flex-1 flex-col ">
        <Header
          title="لوحة المعلم"
          userName={teacher.name}
          profileHref={`/teachers/${id}/profile`}
          notifications={3}
          messages={1}
        />

        <main className="flex-1 p-6">{children}</main>

        {/* <TeacherFooter /> */}
      </div>
    </div>
  );
}
