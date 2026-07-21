import NearReviewSection from "../../NearReviewSection";
import SectionCardFrame from "./SectionCardFrame";

export default function NearReviewCard({ visible, sectionKey, ...props }) {
  return (
    <SectionCardFrame
      isVisible={visible}
      sectionKey={sectionKey}
      title="ما تم في الحصة - مراجعة قريبة"
      description="توثيق المقاطع المراجعة من المنهج القريب."
      tone="blue"
    >
      <NearReviewSection {...props} />
    </SectionCardFrame>
  );
}
