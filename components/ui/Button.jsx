import React from "react";

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  disabled = false,
  onClick,
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-150 select-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer rounded-xl";

  const variants = {
    primary:
      "bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white shadow-sm shadow-orange-500/20 active:scale-[0.98]",
    secondary:
      "bg-white hover:bg-orange-50/60 active:bg-orange-100/60 text-slate-700 border border-slate-200 shadow-xs active:scale-[0.98]",
    outline:
      "border-2 border-orange-500 text-orange-600 hover:bg-orange-50 active:bg-orange-100 active:scale-[0.98]",
    danger:
      "bg-red-50 hover:bg-red-100 active:bg-red-200 text-red-600 border border-red-200 active:scale-[0.98]",
    success:
      "bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white shadow-sm shadow-emerald-600/20 active:scale-[0.98]",
    ghost:
      "text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:bg-slate-200",
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5 gap-1.5 h-8",
    md: "text-sm px-4 py-2 gap-2 h-10",
    lg: "text-base px-5 py-2.5 gap-2.5 h-12 font-semibold",
    icon: "h-9 w-9 p-0 items-center justify-center",
    "icon-sm": "h-7 w-7 p-0 items-center justify-center text-xs",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
