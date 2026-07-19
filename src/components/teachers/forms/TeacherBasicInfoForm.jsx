import FormRenderer from "@/components/forms/FormRenderer";
import FormSection from "@/components/forms/FormSection";

const fields = [
  {
    component: "input",
    name: "name",
    label: "الاسم",
    rules: {
      required: "الاسم مطلوب",
    },
  },
  {
    component: "input",
    name: "email",
    label: "البريد الإلكتروني",
    type: "email",
  },
  {
    component: "select",
    name: "gender",
    label: "الجنس",
    options: [
      { value: "male", label: "ذكر" },
      { value: "female", label: "أنثى" },
    ],
  },
];

export default function TeacherBasicInfoForm({
  register,
  errors,
}) {
  return (
    <FormSection 
      title="البيانات الأساسية"
      description="أدخل البيانات الأساسية الخاصة بالمعلم."
    >
      <div className="space-y-5 ">
        {fields.map((field) => (
          <FormRenderer
            key={field.name}
            field={field}
            register={register}
            errors={errors}
          />
        ))}
      </div>
    </FormSection>
  );
}