import React from "react";

export function Input({
  label,
  id,
  type = "text",
  placeholder = "",
  value,
  defaultValue,
  onChange,
  disabled = false,
  error = "",
  helperText = "",
  icon = null,
  className = "",
  required = false,
  ...props
}) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-semibold text-slate-700 tracking-wide"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3.5 pointer-events-none text-slate-400">
            {icon}
          </div>
        )}

        <input
          id={inputId}
          type={type}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`w-full bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-3.5 py-2.5 transition-colors duration-150 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-3 focus:ring-orange-500/15 disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed ${
            icon ? "pl-10" : ""
          } ${error ? "border-red-400 focus:border-red-500 focus:ring-red-500/15" : ""} ${className}`}
          {...props}
        />
      </div>

      {error ? (
        <span className="text-xs text-red-500 font-medium">{error}</span>
      ) : helperText ? (
        <span className="text-xs text-slate-500">{helperText}</span>
      ) : null}
    </div>
  );
}

export default Input;
