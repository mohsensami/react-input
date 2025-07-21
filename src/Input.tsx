import React, { useState, ChangeEvent } from "react";

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "number" | "password";
  onlyNumbers?: boolean;
  onlyLetters?: boolean;
  maxLength?: number;
  disabled?: boolean;
  error?: string;
  className?: string;
}

const Input = ({
  value,
  onChange,
  placeholder = "",
  type = "text",
  onlyNumbers = false,
  onlyLetters = false,
  maxLength,
  disabled = false,
  error,
  className = "",
}: InputProps) => {
  const [localError, setLocalError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    if (onlyNumbers) {
      inputValue = inputValue.replace(/[^0-9]/g, "");
    } else if (onlyLetters) {
      inputValue = inputValue.replace(/[^a-zA-Zآ-یء ]/g, "");
    }

    if (maxLength && inputValue.length > maxLength) {
      inputValue = inputValue.slice(0, maxLength);
    }

    onChange(inputValue);
  };

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <input
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`border rounded-lg px-3 py-2 text-sm outline-none transition-all ${
          error || localError ? "border-red-500" : "border-gray-300"
        } focus:border-blue-500 disabled:bg-gray-100`}
      />
      {(error || localError) && (
        <span className="text-red-500 text-xs">{error || localError}</span>
      )}
    </div>
  );
};

export default Input;
