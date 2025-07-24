import React, { useState, ChangeEvent, useEffect } from "react";

type CustomInputType = "number" | "noEnglish";

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: CustomInputType;
  maxLength?: number;
  disabled?: boolean;
  error?: string;
  className?: string;
  formatNumberWithCommas?: boolean; // New optional prop
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder = "",
  type = "number",
  maxLength,
  disabled = false,
  error,
  className = "",
  formatNumberWithCommas = false, // Not used anymore, but kept for compatibility
}) => {
  const [localError, setLocalError] = useState<string | null>(null);
  const [displayValue, setDisplayValue] = useState<string>(value);

  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    if (type === "number") {
      // Only allow digits 0-9
      inputValue = inputValue.replace(/[^0-9]/g, "");
    } else if (type === "noEnglish") {
      // Remove English letters (a-z, A-Z)
      inputValue = inputValue.replace(/[a-zA-Z]/g, "");
    }

    if (maxLength && inputValue.length > maxLength) {
      inputValue = inputValue.slice(0, maxLength);
    }

    onChange(inputValue);
    setDisplayValue(inputValue);
  };

  const getInputHTMLType = () => {
    if (type === "number") return "text"; // Use text to allow custom filtering
    return "text";
  };

  const getInputMode = () => {
    if (type === "number") return "numeric";
    return undefined;
  };

  return (
    <div>
      <input
        className={className}
        type={getInputHTMLType()}
        inputMode={getInputMode()}
        value={displayValue}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
      />
      {(error || localError) && <span>{error || localError}</span>}
    </div>
  );
};

export default Input;
