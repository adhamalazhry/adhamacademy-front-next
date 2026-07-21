import { useMemo, useState } from "react";

const SECTION_CONFIG = [
  {
    key: "memorization",
    title: "ما تم تسميعه",
    description: "توثيق التسميع الفعلي داخل الحصة.",
    group: "lesson",
    tone: "emerald",
  },
  {
    key: "nearReview",
    title: "مراجعة قريبة",
    description: "توثيق المراجعة القريبة من المقرر.",
    group: "lesson",
    tone: "blue",
  },
  {
    key: "distantReview",
    title: "مراجعة بعيدة",
    description: "توثيق مراجعة المحفوظ السابق.",
    group: "lesson",
    tone: "amber",
  },
  {
    key: "tajweed",
    title: "تجويد",
    description: "النقاط التي تم شرحها أو التدريب عليها.",
    group: "lesson",
    tone: "violet",
  },
  {
    key: "nextLesson",
    title: "واجب الحصة القادمة",
    description: "خطة الطالب حتى الموعد القادم.",
    group: "homework",
    tone: "teal",
  },
  {
    key: "generalNotes",
    title: "ملاحظات عامة",
    description: "ملخص الحصة والنقاط الأهم.",
    group: "notes",
    tone: "slate",
  },
  {
    key: "studentNotes",
    title: "ملاحظات الطالب",
    description: "ملاحظات خاصة بأداء الطالب.",
    group: "notes",
    tone: "fuchsia",
  },
  {
    key: "parentNotes",
    title: "ملاحظات ولي الامر",
    description: "رسالة مباشرة لولي الامر.",
    group: "notes",
    tone: "rose",
  },
];

export function useLessonReportState({ watchValues }) {
  const [visibleSections, setVisibleSections] = useState({});
  const [activeSection, setActiveSection] = useState("");

  function enableSection(sectionName) {
    setVisibleSections((current) => ({ ...current, [sectionName]: true }));
    setActiveSection(sectionName);
  }

  function disableSection(sectionName) {
    setVisibleSections((current) => ({ ...current, [sectionName]: false }));
    setActiveSection((current) => (current === sectionName ? "" : current));
  }

  function resetSections() {
    setVisibleSections({});
    setActiveSection("");
  }

  const sections = useMemo(() => {
    return SECTION_CONFIG.map((section) => ({
      ...section,
      isVisible: Boolean(visibleSections[section.key]),
    }));
  }, [visibleSections]);

  const progress = useMemo(() => {
    const total = SECTION_CONFIG.length;
    const enabled = SECTION_CONFIG.filter((section) => visibleSections[section.key]).length;
    const percentage = total > 0 ? Math.round((enabled / total) * 100) : 0;

    return { total, enabled, percentage };
  }, [visibleSections]);

  const summary = useMemo(() => {
    const memorizationCount = Array.isArray(watchValues?.memorization)
      ? watchValues.memorization.length
      : 0;
    const nearReviewCount = Array.isArray(watchValues?.nearReview)
      ? watchValues.nearReview.length
      : 0;
    const distantReviewCount = Array.isArray(watchValues?.distantReview)
      ? watchValues.distantReview.length
      : 0;
    const tajweedCount = Array.isArray(watchValues?.tajweedPoints)
      ? watchValues.tajweedPoints.length
      : 0;
    const homeworkCount =
      (Array.isArray(watchValues?.nextLessonMemorization)
        ? watchValues.nextLessonMemorization.length
        : 0) +
      (Array.isArray(watchValues?.nextLessonNearReview)
        ? watchValues.nextLessonNearReview.length
        : 0) +
      (Array.isArray(watchValues?.nextLessonDistantReview)
        ? watchValues.nextLessonDistantReview.length
        : 0);

    const generalNotesLength = String(watchValues?.generalNotes || "").trim().length;
    const studentNotesLength = String(watchValues?.studentNotes || "").trim().length;
    const parentNotesLength = String(watchValues?.parentNotes || "").trim().length;

    return {
      memorizationCount,
      nearReviewCount,
      distantReviewCount,
      tajweedCount,
      homeworkCount,
      generalNotesLength,
      studentNotesLength,
      parentNotesLength,
    };
  }, [watchValues]);

  const hiddenSections = useMemo(
    () => sections.filter((section) => !section.isVisible),
    [sections],
  );

  return {
    sections,
    hiddenSections,
    visibleSections,
    setVisibleSections,
    activeSection,
    setActiveSection,
    enableSection,
    disableSection,
    resetSections,
    progress,
    summary,
  };
}
