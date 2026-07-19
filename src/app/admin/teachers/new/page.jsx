"use client";

import { useForm } from "react-hook-form";

import TeacherBasicInfoForm from "@/components/teachers/forms/TeacherBasicInfoForm";
import FormButton from "@/components/forms/FormButton";
import { createTeacher } from "@/services/teacher.service";

export default function AddTeacherPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(data) {
    try {
      const teacher = await createTeacher(data);

      console.log(teacher);

      alert("تم إضافة المعلم بنجاح");
    } catch (error) {
      console.error(error);

      alert("حدث خطأ أثناء إضافة المعلم");
    }
  }

  return (
    <div className=" bg-amber-300 m-10 p-20" >
      <form onSubmit={handleSubmit(onSubmit)} >
        <TeacherBasicInfoForm register={register} errors={errors} />

        <FormButton loading={isSubmitting}>حفظ المعلم</FormButton>
      </form>
    </div>
  );
}
