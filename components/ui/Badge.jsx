import React from "react";

export function Badge({
  children,
  variant = "neutral",
  size = "md",
  className = "",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center font-medium rounded-full transition-colors select-none";

  const variants = {
    success: "bg-emerald-50 text-emerald-700 border border-emerald-200/80",
    warning: "bg-amber-50 text-amber-700 border border-amber-200/80",
    danger: "bg-rose-50 text-rose-700 border border-rose-200/80",
    info: "bg-sky-50 text-sky-700 border border-sky-200/80",
    primary: "bg-orange-50 text-orange-700 border border-orange-200/80",
    neutral: "bg-slate-100 text-slate-700 border border-slate-200/80",
  };

  const sizes = {
    sm: "text-[11px] px-2 py-0.5 gap-1",
    md: "text-xs px-2.5 py-1 gap-1.5",
    lg: "text-sm px-3 py-1.5 gap-2",
  };

  return (
    <span
      className={`${baseStyles} ${variants[variant] || variants.neutral} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;
