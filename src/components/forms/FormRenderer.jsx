import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormTextarea from "./FormTextarea";

export default function FormRenderer({
  field,
  register,
  errors,
}) {
  const commonProps = {
    label: field.label,
    name: field.name,
    placeholder: field.placeholder,
    defaultValue: field.defaultValue,
    register,
    rules: field.rules,
    error: errors[field.name],
  };

  const inputType = field.type ?? field.inputType;

  switch (field.component) {
    case "input":
      return (
        <FormInput
          {...commonProps}
          type={inputType}
          step={field.step}
          min={field.min}
          max={field.max}
          inputMode={field.inputMode}
        />
      );

    case "select":
      return (
        <FormSelect
          {...commonProps}
          defaultValue={field.defaultValue}
          options={field.options}
        />
      );

    case "textarea":
      return (
        <FormTextarea
          {...commonProps}
          rows={field.rows}
        />
      );

    default:
      return null;
  }
}