"use client";

import { use } from "react";

import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

import { adminLinks } from "@/components/config/sidebar/admin";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function AdminLayout({ children, params }) {
  const { id } = use(params);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-row-reverse">
      <Sidebar
        title="أكاديمية الأدهم"
        subtitle="بوابة المشرف"
        links={adminLinks(id)}
      />

      <div className="flex min-h-screen flex-1 flex-col ">
        <Header
          title="لوحة المشرف"
         
         
          notifications={3}
          messages={1}
        />

        <main className="flex-1 p-6">{children}</main>

        {/* <TeacherFooter /> */}
      </div>
    </div>
  );
}
