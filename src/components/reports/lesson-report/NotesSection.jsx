import DynamicSection from "./DynamicSection";
import FormTextarea from "@/components/forms/FormTextarea";
import { getNestedFormError } from "./lesson-report-utils";

export default function NotesSection({
  name,
  title,
  description,
  accent = "slate",
  register,
  errors,
  placeholder,
}) {
  return (
    <DynamicSection title={title} description={description} accent={accent}>
      <div className="rounded-[1.5rem] border border-white/80 bg-white/80 p-4 shadow-sm shadow-slate-200/40">
        <FormTextarea
          label={title}
          name={name}
          register={register}
          error={getNestedFormError(errors, name)}
          placeholder={placeholder}
          rows={5}
        />
      </div>
    </DynamicSection>
  );
}
