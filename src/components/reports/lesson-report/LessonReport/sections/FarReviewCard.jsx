import FarReviewSection from "../../FarReviewSection";
import SectionCardFrame from "./SectionCardFrame";

export default function FarReviewCard({ visible, sectionKey, ...props }) {
  return (
    <SectionCardFrame
      isVisible={visible}
      sectionKey={sectionKey}
      title="ما تم في الحصة - مراجعة بعيدة"
      description="توثيق المقاطع المراجعة من المحفوظ السابق."
      tone="amber"
    >
      <FarReviewSection {...props} />
    </SectionCardFrame>
  );
}
