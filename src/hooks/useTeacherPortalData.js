"use client";

import useSWR from "swr";
import { getTeacherPortalData } from "@/services/teachers/teacher-dashboard.service";

export function useTeacherPortalData(teacherId) {
  return useSWR(
    teacherId ? ["teacher-portal-data", teacherId] : null,
    () => getTeacherPortalData(teacherId),
    {
      revalidateOnFocus: false,
    }
  );
}
