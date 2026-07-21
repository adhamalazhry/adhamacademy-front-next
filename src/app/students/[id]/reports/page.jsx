import LessonReportsWorkspace from "@/components/reports/lesson-report/LessonReportsWorkspace";

export default function StudentReportsPage({ params }) {
  const { id } = params;

  return <LessonReportsWorkspace studentId={id} />;
}