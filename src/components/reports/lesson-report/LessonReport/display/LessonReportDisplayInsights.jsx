import LessonProgress from "../insights/LessonProgress";
import LessonSummary from "../insights/LessonSummary";
import LessonTimeline from "../insights/LessonTimeline";

export default function LessonReportDisplayInsights({
  progress,
  sections,
  summary,
  activeSection,
  setActiveSection,
  visibleSections,
  enableSection,
}) {
  return (
    <aside className="space-y-4 xl:sticky xl:top-5 xl:self-start">
      <LessonProgress
        progress={progress}
        enabledSections={sections.filter((section) => section.isVisible)}
      />

      <LessonSummary summary={summary} />

      <LessonTimeline
        sections={sections}
        activeSection={activeSection}
        onFocusSection={(sectionKey) => {
          setActiveSection(sectionKey);

          if (!visibleSections[sectionKey]) {
            enableSection(sectionKey);
            return;
          }

          const element = document.getElementById(`section-${sectionKey}`);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }}
      />
    </aside>
  );
}
