import HomeworkSection from "../../HomeworkSection";
import SectionCardFrame from "./SectionCardFrame";

export default function HomeworkCard({ visible, sectionKey, ...props }) {
  return (
    <SectionCardFrame
      isVisible={visible}
      sectionKey={sectionKey}
      title="الحصة القادمة"
      description="خطة الواجب المطلوبة من الطالب قبل الموعد التالي."
      tone="teal"
    >
      <HomeworkSection {...props} />
    </SectionCardFrame>
  );
}
