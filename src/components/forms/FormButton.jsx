"use client";

import Button from "../ui/Button";

export default function FormButton({
  children,
  loading = false,
  loadingText = "جارٍ الحفظ...",
  icon,
  iconPosition = "left",
  variant = "primary",
  fullWidth = false,
  className = "",
  ...props
}) {
  return (
    <Button
      type="submit"
      variant={variant}
      disabled={loading}
      className={`
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...props}
    >
      <div className="flex items-center justify-center gap-2">
        {!loading && icon && iconPosition === "left" && icon}

        <span>
          {loading ? loadingText : children}
        </span>

        {!loading && icon && iconPosition === "right" && icon}
      </div>
    </Button>
  );
}