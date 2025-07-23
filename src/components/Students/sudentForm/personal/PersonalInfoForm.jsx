"use client";

import FormInput from "../shared/FormInput";
import FormSelect from "../shared/FormSelect";

export default function PersonalInfoForm({ register, errors }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <FormInput
        label="اسم الطالب"
        type="text"
        name="name"
        register={register}
        error={errors.name}
        requiredMessage="الاسم مطلوب"
      />

      <FormInput
        label="السن"
        type="number"
        name="age"
        register={register}
        error={errors.age}
        requiredMessage="السن مطلوب"
      />

      <FormSelect
        label="النوع"
        name="gender"
        register={register}
        options={["ذكر", "أنثى"]}
        error={errors.gender}
        requiredMessage="النوع مطلوب"
      />

      <FormInput
        label="الجنسية"
        type="text"
        name="nationality"
        register={register}
        error={errors.nationality}
        requiredMessage="الجنسية مطلوبة"
      />

      <FormInput
        label="بلد الإقامة"
        type="text"
        name="residency"
        register={register}
        error={errors.residency}
        requiredMessage="بلد الإقامة مطلوب"
      />

      <FormInput
        label="رقم الهاتف"
        type="tel"
        name="phone"
        register={register}
        error={errors.phone}
        requiredMessage="رقم الهاتف مطلوب"
      />

      <FormInput
        label="رقم ولي الأمر"
        type="tel"
        name="guardianPhone"
        register={register}
        error={errors.guardianPhone}
        requiredMessage="رقم ولي الأمر مطلوب"
      />

      <FormInput
        label="البريد الإلكتروني"
        type="email"
        name="email"
        register={register}
        error={errors.email}
        requiredMessage="البريد الإلكتروني مطلوب"
      />
    </div>
  );
}
