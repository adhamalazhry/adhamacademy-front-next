"use client";

import { use } from "react";

export default function paymentsPage({ params }) {
  const { id } = use(params);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold"> الاشتراكات والمدفوعات </h1>

      <p className="mt-4">
        Student ID: {id}
      </p>
    </div>
  );
}

