"use client";

import Select from "../ui/Select";

export default function FormSelect({
  label,
  name,
  options = [],
  register,
  rules,
  error,
  defaultValue,
  ...props
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <Select
        id={name}
        options={options}
        defaultValue={defaultValue}
        {...register(name, rules)}
        {...props}
      />

      {error && (
        <p className="text-sm text-red-500">
          {error.message}
        </p>
      )}
    </div>
  );
}