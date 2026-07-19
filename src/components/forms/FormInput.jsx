"use client";

import Input from "../ui/Input";

export default function FormInput({
  label,
  name,
  register,
  rules,
  error,
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

      <Input
        id={name}
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