import { z } from "zod";

export const studentSchema = z.object({
  name: z.string().min(1, "الاسم مطلوب"),
  age: z.string().min(1, "السن مطلوب"),
  gender: z.string().min(1, "النوع مطلوب"),
  nationality: z.string().min(1, "الجنسية مطلوبة"),
  residency: z.string().min(1, "بلد الإقامة مطلوبة"),
  phone: z.string().min(1, "رقم الهاتف مطلوب"),
  guardianPhone: z.string().min(1, "رقم ولي الأمر مطلوب"),
  email: z.string().email("بريد إلكتروني غير صالح"),

  subscriptionDate: z.string().min(1, "تاريخ الاشتراك مطلوب"),
  fees: z.string().min(1, "رسوم الاشتراك مطلوبة"),
  currency: z.string().min(1, "العملة مطلوبة"),
  monthlySessions: z.string().min(1, "عدد الحصص مطلوب"),
  sessionDuration: z.string().min(1, "مدة الحصة مطلوبة"),
  teacher: z.string().min(1, "اسم المعلم مطلوب"),

  selectedDays: z.array(z.string()).min(1, "اختر على الأقل يومًا واحدًا"),
  schedule: z.record(
    z.object({
      from: z.string().min(1, "وقت البداية مطلوب"),
      to: z.string().min(1, "وقت النهاية مطلوب"),
    })
  )
});
