import QuranListSection from "./QuranListSection";

export default function NearReviewSection(props) {
  return (
    <QuranListSection
      {...props}
      title="   المراجعة القريبة"
      description="سجل المراجعة القريبة  التي قام الطالب بمراجعتها."
      accent="blue"
      name="nearReview"
    />
  );
}
