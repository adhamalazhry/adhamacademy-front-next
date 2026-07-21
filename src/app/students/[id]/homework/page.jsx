"use client";

import { use } from "react";
import StudentHomeworkWorkspace from "@/components/Students/StudentHomeworkWorkspace";

export default function StudentHomeworkPage({ params }) {
  const { id } = use(params);

  return <StudentHomeworkWorkspace studentId={id} />;
}
