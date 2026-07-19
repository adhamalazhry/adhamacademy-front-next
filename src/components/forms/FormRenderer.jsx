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
    register,
    rules: field.rules,
    error: errors[field.name],
  };

  switch (field.component) {
    case "input":
      return (
        <FormInput
          {...commonProps}
          type={field.inputType}
        />
      );

    case "select":
      return (
        <FormSelect
          {...commonProps}
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