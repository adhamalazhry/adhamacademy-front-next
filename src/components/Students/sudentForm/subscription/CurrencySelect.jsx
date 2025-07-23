// src/components/StudentForm/CurrencySelect.jsx
import FormSelect from "../shared/FormSelect";

export default function CurrencySelect({ register, error }) {
  const options = ["SAR", "QAR", "EGP", "USD"];

  return (
    <FormSelect
      label="العملة"
      name="currency"
      register={register}
      options={options}
      error={error}
    />
  );
}
