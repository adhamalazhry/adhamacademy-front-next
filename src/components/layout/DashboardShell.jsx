"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

export default function DashboardShell({
  children,
  title,
  subtitle,
  logo,
  links = [],
  userName,
  profileHref = "#",
  notifications = 0,
  messages = 0,
  helpBox,
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header
        title={title}
        onToggleSidebar={() => setIsSidebarOpen((value) => !value)}
        userName={userName}
        profileHref={profileHref}
        notifications={notifications}
        messages={messages}
      />

      <div className="flex overflow-hidden">
        <Sidebar
          title={title}
          subtitle={subtitle}
          logo={logo}
          links={links}
          helpBox={helpBox}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          activePath={pathname}
        />

        <main className="flex-1 overflow-hidden">
          <div className="mx-auto min-h-[calc(100vh-5.5rem)] max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
