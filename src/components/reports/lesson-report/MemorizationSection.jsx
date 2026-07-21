import QuranListSection from "./QuranListSection";

export default function MemorizationSection(props) {
  return (
    <QuranListSection
      {...props}
      title="ما تم تسميعه من الحفظ"
      description="سجّل الآيات أو المقاطع التي تم تسميعها فعليًا داخل هذه الحصة."
      accent="emerald"
      name="memorization"
    />
  );
}
