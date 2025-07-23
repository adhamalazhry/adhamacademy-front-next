
"use client";

import { useForm } from "react-hook-form";

export default function AddTeacherForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Teacher data:", data);
    // هنا ممكن تبعت البيانات لسيرفر أو API
    reset(); // لتفريغ الفورم بعد الإرسال
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto mt-10 p-8 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 space-y-6 transition-all duration-300"
    >
      <h2 className="text-3xl font-extrabold text-center text-blue-700 dark:text-white">
        ✨ إضافة معلم جديد ✨
      </h2>

      {/* اسم المعلم */}
      <div>
        <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
          اسم المعلم
        </label>
        <input
          type="text"
          {...register("name", { required: "الاسم مطلوب" })}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.name && (
          <p className="mt-1 text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      {/* البريد الإلكتروني */}
      <div>
        <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
          البريد الإلكتروني
        </label>
        <input
          type="email"
          {...register("email", {
            required: "البريد مطلوب",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "بريد غير صالح",
            },
          })}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && (
          <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      {/* رقم الهاتف */}
      <div>
        <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
          رقم الهاتف
        </label>
        <input
          type="tel"
          {...register("phone", {
            required: "رقم الهاتف مطلوب",
            pattern: {
              value: /^[0-9]{6,15}$/,
              message: "رقم غير صالح",
            },
          })}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.phone && (
          <p className="mt-1 text-red-500 text-sm">{errors.phone.message}</p>
        )}
      </div>

      {/* زر الإرسال */}
      <div className="text-center">
        <button
          type="submit"
          className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-lg shadow-lg transition-all duration-300 hover:scale-105"
        >
          🚀 إضافة المعلم
        </button>
      </div>
    </form>
  );
}
