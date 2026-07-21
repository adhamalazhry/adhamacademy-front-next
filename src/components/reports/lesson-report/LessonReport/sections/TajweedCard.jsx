import TajweedSection from "../../TajweedSection";
import SectionCardFrame from "./SectionCardFrame";

export default function TajweedCard({ visible, sectionKey, register, errors, control, onRemoveSection }) {
  return (
    <SectionCardFrame
      isVisible={visible}
      sectionKey={sectionKey}
      title="التجويد"
      description="النقاط التي تم شرحها او التدريب عليها خلال الحصة."
      tone="violet"
    >
      <TajweedSection
        name="tajweedPoints"
        title="التجويد"
        description="اضف نقاط التجويد التي تم شرحها او التدريب عليها."
        register={register}
        errors={errors}
        control={control}
        onRemoveSection={onRemoveSection}
      />
    </SectionCardFrame>
  );
}
