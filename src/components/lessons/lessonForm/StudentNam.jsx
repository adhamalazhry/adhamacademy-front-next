"use client";
// import SuraSelect from "./SuraSelect";
import React from "react";
import { useForm } from "react-hook-form";

export default function StudentName() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) =>{
    console.log(data);
    reset()
  } 

  const students = ["محمد أحمد", "سارة علي", "آدم يوسف"];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg space-y-6"
    >
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          اسم الطالب
        </label>
        <select
          {...register("studentName", {
            required: "الرجاء اختيار اسم الطالب",
          })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- اختر اسم الطالب --</option>
          {students.map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>
        {errors.studentName && (
          <p className="mt-2 text-sm text-red-600">
            {errors.studentName.message}
          </p>
        )}
      </div>
      

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
      >
        إرسال
      </button>
    </form>
  );
}
