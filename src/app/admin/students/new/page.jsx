"use client";

import { useForm } from "react-hook-form";

import StudentBasicInfoForm from "@/components/students/forms/StudentBasicInfoForm";
import FormButton from "@/components/forms/FormButton";
import { createStudent } from "@/services/students/student.service";

export default function AddStudentPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(data) {
    try {
      const student = await createStudent(data);

      console.log(student);

      alert("تم إضافة الطالب بنجاح");
    } catch (error) {
      console.error(error);

      alert("حدث خطأ أثناء إضافة الطالب");
    }
  }

  return (
    <div className=" bg-red-800 m-10 p-20" >
      <form onSubmit={handleSubmit(onSubmit)} >
        <StudentBasicInfoForm register={register} errors={errors} />

        <FormButton loading={isSubmitting}>حفظ الطالب</FormButton>
      </form>
    </div>
  );
}
