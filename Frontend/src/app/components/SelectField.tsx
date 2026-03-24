interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  options: SelectOption[];
  required?: boolean;
  disabled?: boolean;
}

export function SelectField({
  label,
  placeholder = 'Chọn...',
  value,
  onChange,
  options,
  required,
  disabled
}: SelectFieldProps) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm text-foreground">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        required={required}
        disabled={disabled}
        className="w-full px-4 py-2.5 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
