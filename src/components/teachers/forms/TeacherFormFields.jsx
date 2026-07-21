import FormRenderer from "@/components/forms/FormRenderer";
import FormSection from "@/components/forms/FormSection";

const currencyOptions = [
  { value: "EGP", label: "EGP" },
  { value: "SAR", label: "SAR" },
  { value: "AED", label: "AED" },
  { value: "USD", label: "USD" },
];

const fullFields = [
  {
    component: "input",
    name: "name",
    label: "اسم المعلم",
    rules: {
      required: "اسم المعلم مطلوب",
    },
  },
  {
    component: "input",
    name: "email",
    label: "البريد الإلكتروني",
    type: "email",
  },
  {
    component: "input",
    name: "hourlyRate",
    label: "سعر الساعة",
    type: "number",
    inputMode: "decimal",
    min: 0,
    step: "0.01",
    rules: {
      required: "سعر الساعة مطلوب",
      valueAsNumber: true,
      min: {
        value: 0,
        message: "سعر الساعة يجب أن يكون صفر أو أكبر",
      },
    },
  },
  {
    component: "select",
    name: "currency",
    label: "العملة",
    placeholder: "اختياري",
    options: currencyOptions,
    defaultValue: "EGP",
    rules: {
      setValueAs: (value) => {
        if (typeof value !== "string") return "";

        const normalized = value.trim().toUpperCase();

        return normalized || "";
      },
      validate: (value) => {
        if (!value) return true;

        if (typeof value !== "string") {
          return "العملة يجب أن تكون نصًا";
        }

        if (value.trim().length !== 3) {
          return "العملة يجب أن تتكون من 3 حروف";
        }

        return true;
      },
    },
  },
];

const rateFields = fullFields.slice(2);

export default function TeacherFormFields({
  register,
  errors,
  mode = "full",
  sectionTitle = "البيانات الأساسية",
  sectionDescription = "أدخل البيانات الأساسية الخاصة بالمعلم.",
  currencyDefaultValue = "",
}) {
  const fields = mode === "rate" ? rateFields : fullFields;

  return (
    <FormSection title={sectionTitle} description={sectionDescription}>
      <div className="space-y-5">
        {fields.map((field) => (
          <FormRenderer
            key={field.name}
            field={{
              ...field,
              defaultValue:
                field.name === "currency"
                  ? (currencyDefaultValue !== undefined
                      ? currencyDefaultValue
                      : field.defaultValue)
                  : field.defaultValue,
            }}
            register={register}
            errors={errors}
          />
        ))}
      </div>
    </FormSection>
  );
}