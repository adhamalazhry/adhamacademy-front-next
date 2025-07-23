"use client";

export default function StepProgressBar({ step }) {
  return (
    <div className="max-w-4xl mx-auto mt-6 mb-8 px-4">
      <div className="flex items-center justify-between relative">
      
      
        {/* Step 1 - البيانات الشخصية */}
        <div className="flex flex-col items-center w-1/3 z-10">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold 
              ${step === 1 ? "bg-blue-600 shadow-lg scale-110" : "bg-gray-300 dark:bg-gray-700"}`}
          >
            1
          </div>

          <span
            className={`mt-2 text-sm font-semibold ${
              step === 1 ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-300"
            }`}
          >
            البيانات الشخصية
          </span>
        </div>






        {/* Step 2 - بيانات الاشتراك */}
        <div className="flex flex-col items-center w-1/3 z-10">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold 
              ${step === 2 ? "bg-blue-600 shadow-lg scale-110" : "bg-gray-300 dark:bg-gray-700"}`}
          >
            2
          </div>
          <span
            className={`mt-2 text-sm font-semibold ${
              step === 2 ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-300"
            }`}
          >
            بيانات الاشتراك
          </span>
        </div>

        {/* Step 3 - المراجعة والإرسال */}
        <div className="flex flex-col items-center w-1/3 z-10">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold 
              ${step === 3 ? "bg-blue-600 shadow-lg scale-110" : "bg-gray-300 dark:bg-gray-700"}`}
          >
            3
          </div>
          <span
            className={`mt-2 text-sm font-semibold ${
              step === 3 ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-300"
            }`}
          >
            المراجعة والتسجيل
          </span>
        </div>

        {/* Progress line - 3 مراحل */}
        <div className="absolute top-5 left-1/6 w-4/6 h-1 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              step === 3
                ? "w-full bg-blue-600"
                : step === 2
                ? "w-1/2 bg-blue-600"
                : "w-0 bg-transparent"
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
}
