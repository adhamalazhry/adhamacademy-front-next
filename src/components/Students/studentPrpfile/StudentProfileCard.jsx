"use client";

import { useEffect, useState } from "react";

export default function StudentProfileCard({ student }) {
  const [previewUrl, setPreviewUrl] = useState(student?.photo || "");
  const [selectedFileName, setSelectedFileName] = useState("");

  const attendanceStatus = student?.attendanceStatus || "منتظم في الحضور";
  const activeStatus = student?.status || (student?.active ? "نشط" : "غير نشط");
  const studentCode = student?.code || `STD-${student?.id ?? "000"}`;
  const subscriptionDate =
    student?.subscriptionDate || student?.joinedAt || student?.createdAt || "-";
  const birthDate = student?.birthDate || "-";
  const teacherName = student?.teacher?.name || "غير محدد";

  useEffect(() => {
    if (student?.photo) {
      setPreviewUrl(student.photo);
    }
  }, [student?.photo]);

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setSelectedFileName(file.name);
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-gradient-to-l from-blue-50 via-white to-slate-50 p-8 shadow-md">
      <div className="flex flex-col-reverse gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="text-right lg:max-w-[55%]">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
            الملف الشخصي للطالب
          </p>

          <h1 className="mt-4 text-4xl font-bold text-slate-900">
            {student?.name}
          </h1>

          <p className="mt-2 text-slate-600">
            {student?.grade ? `الصف ${student.grade}` : "طالب"}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Badge text={attendanceStatus} variant="blue" />
            <Badge text={activeStatus} variant={activeStatus === "نشط" ? "green" : "gray"} />
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <StatCard label="كود الطالب" value={studentCode} />
            <StatCard label="تاريخ الانضمام" value={subscriptionDate} />
            <StatCard label="تاريخ الميلاد" value={birthDate} />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-lg">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="صورة الطالب"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-slate-100 text-5xl text-slate-400">
                👩‍🎓
              </div>
            )}
          </div>

          <label className="inline-flex cursor-pointer items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            تحميل صورة
          </label>

          {selectedFileName ? (
            <p className="text-sm text-slate-500">{selectedFileName}</p>
          ) : null}
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <DetailCard label="المعلم المتابع" value={teacherName} />
        <DetailCard label="رقم الهاتف" value={student?.phone || "-"} />
        <DetailCard label="البريد الإلكتروني" value={student?.email || "-"} />
        <DetailCard label="الحالة" value={activeStatus} />
      </div>
    </section>
  );
}

function Badge({ text, variant }) {
  const classes = {
    blue: "bg-blue-100 text-blue-700",
    green: "bg-emerald-100 text-emerald-700",
    gray: "bg-slate-100 text-slate-700",
  };

  return (
    <span className={`rounded-full px-3 py-1 text-sm font-semibold ${classes[variant]}`}>
      {text}
    </span>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 text-right shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-lg font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function DetailCard({ label, value }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 text-right shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-base font-medium text-slate-900">{value}</p>
    </div>
  );
}
