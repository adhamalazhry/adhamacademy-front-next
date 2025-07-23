"use client";

// استيراد مكونات الإدخال الخاصة بالحصة - Import session input components
import FormInput from "../shared/FormInput";
import CurrencySelect from "./CurrencySelect";
import DayAndTimeSelector from "./DayAndTimeSelector";

// كمبوننت معلومات الحصة - Session Information Section Component
export default function MainSubsceriptionForm({ register, errors, setValue, watch }) {
  return (
    <>
      {/* شبكة من مدخلات الحصة موزعة على عمودين - Session input fields grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* تاريخ الاشتراك - Subscription Date */}
        <FormInput
          label="تاريخ الاشتراك"
          type="date"
          name="subscriptionDate"
          register={register}
        />

        {/* رسوم الاشتراك - Subscription Fee */}
        <FormInput
          label="رسوم الاشتراك"
          type="number"
          name="fees"
          register={register}
        />

        {/* اختيار العملة - Currency Select Dropdown */}
        <CurrencySelect register={register} error={errors.currency} />

        {/* عدد الحصص الشهرية - Monthly Sessions Count */}
        <FormInput
          label="عدد الحصص الشهرية"
          type="number"
          name="monthlySessions"
          register={register}
        />

        {/* مدة الحصة بالدقائق - Session Duration */}
        <FormInput
          label="مدة الحصة (دقائق)"
          type="number"
          name="sessionDuration"
          register={register}
        />

        {/* المعلم المتابع - Assigned Teacher */}
        <FormInput
          label="المعلم المتابع"
          type="text"
          name="teacher"
          register={register}
        />
      </div>

      {/* جدول الحضور والتوقيت - Attendance Days and Times */}
      <DayAndTimeSelector
        register={register}
        setValue={setValue}
        watch={watch}
      />
    </>
  );
}
