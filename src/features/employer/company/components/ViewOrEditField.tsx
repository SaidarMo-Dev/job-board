import React from "react";

interface ViewOrEditFieldProps {
  label: string;
  value?: string | number | null;
  isEditing: boolean;
  children: React.ReactNode;
  className?: string;
  helperText?: string;
}

const ViewOrEditField: React.FC<ViewOrEditFieldProps> = ({
  label,
  value,
  isEditing,
  children,
  className = "",
  helperText,
}) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {/* Label - Always visible, smaller and muted */}
      <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </label>

      <div className="min-h-[2.5rem] flex items-center">
        {isEditing ? (
          <div className="w-full animate-in fade-in duration-200">
            {children}
            {helperText && (
              <p className="mt-1 text-xs text-slate-400">{helperText}</p>
            )}
          </div>
        ) : (
          <div className="w-full">
            {value || value === 0 ? (
              <p className="text-slate-900 font-medium leading-relaxed">
                {value}
              </p>
            ) : (
              <p className="text-slate-400 italic text-sm">Not provided</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewOrEditField;
