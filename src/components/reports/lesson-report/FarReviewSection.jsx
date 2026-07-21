import QuranListSection from "./QuranListSection";

export default function FarReviewSection(props) {
  return (
    <QuranListSection
      {...props}
      title="ما تم مراجعته مراجعة بعيدة"
      description="سجّل المقاطع التي راجعها الطالب من المحفوظ السابق أو الأبعد."
      accent="amber"
      name="distantReview"
    />
  );
}
