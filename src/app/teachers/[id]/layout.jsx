"use client";

import { use } from "react";
import useSWR from "swr";
import DashboardShell from "@/components/layout/DashboardShell";
import { getTeacherLinks } from "@/components/config/sidebar/teacher";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function TeacherLayout({ children, params }) {
  const { id } = use(params);
  const { data: teacher, error, isLoading } = useSWR(
    `/api/teachers/${id}`,
    fetcher,
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <DashboardShell
      title="لوحة المعلم"
      subtitle="بوابة المعلم"
      logo="/logo.png"
      links={getTeacherLinks(id)}
      userName={teacher.name}
      profileHref={`/teachers/${id}/profile`}
      notifications={3}
      messages={1}
      helpBox={{
        icon: "📚",
        title: "مركز المعلم",
        description: "تابع طلابك وحصصك وتقاريرك من واجهة موحدة.",
      }}
    >
      {children}
    </DashboardShell>
  );
}
