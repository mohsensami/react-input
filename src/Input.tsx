import React, { useState, ChangeEvent, useEffect } from "react";

type CustomInputType = "text" | "number" | "password" | "letters";

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: CustomInputType;
  maxLength?: number;
  disabled?: boolean;
  error?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder = "",
  type = "text",
  maxLength,
  disabled = false,
  error,
  className = "",
}) => {
  const [localError, setLocalError] = useState<string | null>(null);
  const [displayValue, setDisplayValue] = useState<string>(value);

  useEffect(() => {
    if (type === "number") {
      const numericValue = value.replace(/,/g, "");
      if (!isNaN(Number(numericValue))) {
        setDisplayValue(formatNumberWithCommas(numericValue));
      } else {
        setDisplayValue(value);
      }
    } else {
      setDisplayValue(value);
    }
  }, [value, type]);

  const formatNumberWithCommas = (numStr: string): string => {
    if (!numStr) return "";
    return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    if (type === "number") {
      // Remove all non-digit characters
      const unformattedValue = inputValue.replace(/[^0-9]/g, "");

      // Apply maxLength to the unformatted value
      if (maxLength && unformattedValue.length > maxLength) {
        return; // Don't update the value if it exceeds maxLength
      }

      // Update the parent component with the unformatted value
      onChange(unformattedValue);

      // Update the display value with commas
      setDisplayValue(formatNumberWithCommas(unformattedValue));
      return;
    } else if (type === "letters") {
      inputValue = inputValue.replace(/[^a-zA-Zآ-یء\s]/g, "");
    }

    if (maxLength && inputValue.length > maxLength) {
      inputValue = inputValue.slice(0, maxLength);
    }

    onChange(inputValue);
    setDisplayValue(inputValue);
  };

  const getInputHTMLType = () => {
    if (type === "password") return "password";
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
      />
      {(error || localError) && <span>{error || localError}</span>}
    </div>
  );
};

export default Input;
