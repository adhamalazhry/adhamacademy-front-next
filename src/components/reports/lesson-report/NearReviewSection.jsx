import QuranListSection from "./QuranListSection";

export default function NearReviewSection(props) {
  return (
    <QuranListSection
      {...props}
      title="ما تم مراجعته مراجعة قريبة"
      description="سجّل المقاطع التي راجعها الطالب من المقرر القريب خلال الحصة."
      accent="blue"
      name="nearReview"
    />
  );
}
