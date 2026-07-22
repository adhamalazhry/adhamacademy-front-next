import MemorizationSection from "../../MemorizationSection";
import SectionCardFrame from "./SectionCardFrame";

export default function MemorizationCard({ visible, sectionKey, ...props }) {
  return (
    <SectionCardFrame
      isVisible={visible}
      sectionKey={sectionKey}
      title="     التسميع"
      description="توثيق الايات التي تم تسميعها بالفعل داخل الحصة."
      tone="emerald"
    >
      <MemorizationSection {...props} />
    </SectionCardFrame>
  );
}
