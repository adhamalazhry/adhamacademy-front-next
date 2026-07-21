"use client";

import { useMemo, useState } from "react";
import useSWR, { mutate } from "swr";
import { MoreVertical, WalletCards } from "lucide-react";
import Popover from "@/components/ui/Popover";
import {
  createStudentSubscription,
  getStudentSubscription,
  updateStudentSubscription,
} from "@/services/subscription.service";
import SubscriptionActions from "./SubscriptionActions";
import SubscriptionDetails from "./SubscriptionDetails";
import SubscriptionForm from "./SubscriptionForm";

function normalizeSubscription(student) {
  if (!student) return null;

  const hasValue = (value) =>
    value !== undefined && value !== null && value !== "";

  const hasAnyValue =
    hasValue(student.subscriptionFee) ||
    hasValue(student.monthlySessions) ||
    hasValue(student.sessionDuration) ||
    hasValue(student.currency);

  if (!hasAnyValue) return null;

  return {
    id: student.subscriptionId ?? null,
    subscriptionFee: student.subscriptionFee ?? "",
    currency: student.currency ?? "",
    monthlySessions: student.monthlySessions ?? "",
    sessionDuration: student.sessionDuration ?? "",
  };
}

export default function SubscriptionSelector({
  student,
  isOpen: controlledIsOpen,
  onOpenChange,
}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [activeView, setActiveView] = useState("actions");
  const [isSaving, setIsSaving] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const isControlled =
    typeof controlledIsOpen === "boolean" &&
    typeof onOpenChange === "function";

  const isOpen = isControlled
    ? controlledIsOpen
    : internalIsOpen;

  const setOpen = isControlled
    ? onOpenChange
    : setInternalIsOpen;

  const subscriptionKey = `/students/${student.id}/subscription`;

  const {
    data: fetchedSubscription,
    error: subscriptionError,
  } = useSWR(subscriptionKey, () =>
    getStudentSubscription(student.id)
  );

  const fallbackSubscription = useMemo(
    () => normalizeSubscription(student),
    [student]
  );

  const subscription = fetchedSubscription || fallbackSubscription;

  const hasSubscription = Boolean(subscription);

  const initialValues = useMemo(
    () => ({
      subscriptionFee: subscription?.subscriptionFee ?? "",
      currency: subscription?.currency ?? "",
      monthlySessions: subscription?.monthlySessions
        ? String(subscription.monthlySessions)
        : "",
      sessionDuration: subscription?.sessionDuration
        ? String(subscription.sessionDuration)
        : "",
    }),
    [subscription]
  );

  function resetPopover() {
    setActiveView("actions");
    setSubmitError("");
  }

  function togglePopover() {
    const nextState = !isOpen;

    setOpen(nextState);

    if (!nextState) {
      resetPopover();
    }
  }

  function closePopover() {
    setOpen(false);
    resetPopover();
  }

  function handlePopoverOpenChange(open) {
    setOpen(open);

    if (!open) {
      resetPopover();
    }
  }

  async function resolveSubscriptionId() {
    if (subscription?.id) {
      return subscription.id;
    }

    const currentSubscription = await getStudentSubscription(
      student.id
    );

    if (currentSubscription?.id) {
      await mutate(subscriptionKey, currentSubscription, false);
      return currentSubscription.id;
    }

    return null;
  }

  async function handleSubmit(values) {
    if (isSaving) return;

    try {
      setIsSaving(true);
      setSubmitError("");

      const payload = {
        ...values,
        monthlySessions: Number(values.monthlySessions),
        sessionDuration: Number(values.sessionDuration),
      };

      const subscriptionId = await resolveSubscriptionId();

      const savedSubscription = subscriptionId
        ? await updateStudentSubscription(subscriptionId, payload)
        : await createStudentSubscription(student.id, payload);

      if (savedSubscription?.id) {
        await mutate(subscriptionKey, savedSubscription, false);
      } else {
        await mutate(subscriptionKey);
      }

      await mutate("/students");

      closePopover();
    } catch (error) {
      console.error("فشل حفظ الاشتراك:", error);
      setSubmitError("حدث خطأ أثناء حفظ بيانات الاشتراك.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Popover
      open={isOpen}
      onOpenChange={handlePopoverOpenChange}
      trigger={
        <div
          dir="rtl"
          className={`
            group
            inline-flex
            min-w-[270px]
            items-center
            justify-between
            gap-3
            rounded-xl
            border
            px-3
            py-2
            transition-all
            duration-200
            ${
              isOpen
                ? "border-blue-300 bg-blue-50 shadow-sm ring-2 ring-blue-100"
                : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
            }
          `}
        >
          <div className="flex min-w-0 items-center gap-3">
            <div
              className={`
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                ${
                  hasSubscription
                    ? "bg-blue-100 text-blue-600"
                    : "bg-slate-100 text-slate-400"
                }
              `}
            >
              <WalletCards className="h-4 w-4" />
            </div>

            <SubscriptionDetails subscription={subscription} />
          </div>

          <button
            type="button"
            aria-label="إجراءات الاشتراك"
            onClick={togglePopover}
            className={`
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-lg
              transition-all
              duration-200
              focus:outline-none
              focus:ring-2
              focus:ring-blue-200
              ${
                isOpen
                  ? "bg-blue-600 text-white"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              }
            `}
          >
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      }
    >
      <div
        dir="rtl"
        className="
          w-[340px]
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
          shadow-2xl
          shadow-slate-900/10
        "
      >
        {activeView === "actions" ? (
          <SubscriptionActions
            hasSubscription={hasSubscription}
            onOpenForm={() => setActiveView("form")}
          />
        ) : (
          <SubscriptionForm
            title={hasSubscription ? "تعديل الاشتراك" : "إضافة اشتراك"}
            initialValues={initialValues}
            isSaving={isSaving}
            submitError={submitError}
            onSubmit={handleSubmit}
            onBack={() => setActiveView("actions")}
          />
        )}

        {subscriptionError ? (
          <p className="px-4 pb-4 text-xs text-red-600">
            تعذر تحميل بيانات الاشتراك.
          </p>
        ) : null}
      </div>
    </Popover>
  );
}
