import FormTextarea from "@/components/forms/FormTextarea";
import { getNestedFormError } from "../../lesson-report-utils";
import SectionCardFrame from "./SectionCardFrame";

export default function NotesCard({
  visible,
  sectionKey,
  tone = "slate",
  name,
  title,
  description,
  register,
  errors,
  placeholder,
  value,
}) {
  const textLength = String(value || "").length;

  return (
    <SectionCardFrame
      isVisible={visible}
      sectionKey={sectionKey}
      title={title}
      description={description}
      tone={tone}
    >
      <div className="rounded-[1.3rem] border border-white/80 bg-white/85 p-4 shadow-sm shadow-slate-200/40">
        <FormTextarea
          label={title}
          name={name}
          register={register}
          error={getNestedFormError(errors, name)}
          placeholder={placeholder}
          rows={5}
        />

        <p className="mt-2 text-left text-xs font-semibold text-slate-500">{textLength} حرف</p>
      </div>
    </SectionCardFrame>
  );
}
