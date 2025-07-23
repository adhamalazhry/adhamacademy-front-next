"use client";

// Import hooks and components
import { useForm } from "react-hook-form";
import { useState } from "react";
import PersonalInfoForm from "./personal/PersonalInfoForm";
import MainSubsceriptionForm from "./subscription/MainSubsceriptionForm.jsx";
import FormNavigationButtons from "./shared/FormNavigationButtons";
import PreviewDataBeforSubmit from "./preview/PreviewDataBeforSubmit";
import StepProgressBar from "./shared/StepProgressBar";

// Main student registration form component
export default function MainStudentForm() {
  // Initialize the form using react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  // Track current form step (1: Personal Info, 2: Subscription Info, 3: Preview)
  const [step, setStep] = useState(1);

  // Handle final form submission
  const onSubmit = (data) => {
    console.log("✅ Submitted Student Data:", data);
    reset();       // Reset form fields
    setStep(1);    // Return to first step after submission
    alert("تم تسجيل الطالب بنجاح")
  };

  return (
    <>
      {/* Top step progress bar */}
      <StepProgressBar step={step} />

      {/* Main form wrapper */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 p-10 space-y-8"
      >
        {/* Form heading */}
        <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl shadow">
          📘 New Student Registration
        </h2>

        {/* Step 1: Personal Information Form */}
        {step === 1 && (
          <>
            <PersonalInfoForm register={register} errors={errors} />
            <FormNavigationButtons
              step={step}
              setStep={setStep}
              handleSubmit={handleSubmit}
            />
          </>
        )}

        {/* Step 2: Subscription Details Form */}
        {step === 2 && (
          <>
            <MainSubsceriptionForm
              register={register}
              errors={errors}
              setValue={setValue}
              watch={watch}
            />
            <FormNavigationButtons
              step={step}
              setStep={setStep}
              handleSubmit={handleSubmit}
            />
          </>
        )}

        {/* Step 3: Preview Form Data */}
        {step === 3 && (
          <>
            <PreviewDataBeforSubmit watch={watch} />
            <FormNavigationButtons
              step={step}
              setStep={setStep}
              handleSubmit={handleSubmit}
            />
          </>
        )}
      </form>
    </>
  );
}
