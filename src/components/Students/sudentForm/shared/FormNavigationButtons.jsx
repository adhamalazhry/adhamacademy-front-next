"use client";

export default function FormNavigationButtons({ step, setStep, handleSubmit }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-center items-center pt-6">
      {/* زر الرجوع متاح في الخطوتين 2 و 3 */}
      {step > 1 && (
        <button
          type="button"
          onClick={() => setStep(step - 1)}
          className="px-10 py-3 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 text-black dark:text-white text-lg font-semibold rounded-full shadow transition-all"
        >
          ⬅️ الرجوع
        </button>
      )}

      {/* زر التالي من 1 إلى 2 */}
      {step === 1 && (
        <button
          type="button"
          onClick={handleSubmit(() => setStep(2))}
          className="px-10 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-full shadow-lg transition-all"
        >
          التالي ⏭️
        </button>
      )}

      {/* زر التالي من 2 إلى 3 */}
      {step === 2 && (
        <button
          type="button"
          onClick={handleSubmit(() => setStep(3))}
          className="px-10 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-full shadow-lg transition-all"
        >
          معاينة البيانات 👁️
        </button>
      )}

      {/* زر الإرسال في الخطوة 3 فقط */}
      {step === 3 && (
        <button
          type="submit"
          className="px-10 py-3 bg-green-600 hover:bg-green-700 text-white text-lg font-bold rounded-full shadow-lg transition-all"
        >
          ✅ تأكيد وتسجيل الطالب
        </button>
      )}
    </div>
  );
}
