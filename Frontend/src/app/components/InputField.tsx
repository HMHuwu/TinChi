interface InputFieldProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: any;
  onChange?: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string;
}

export function InputField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
  disabled,
  error,
}: InputFieldProps) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm text-foreground">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        required={required}
        disabled={disabled}
        className={`
          w-full px-4 py-2.5 bg-input-background border rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? "border-destructive" : "border-input"}
        `}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
