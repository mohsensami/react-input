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
  formatNumberWithCommas?: boolean; // New optional prop
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
  formatNumberWithCommas = false, // Default to false
}) => {
  const [localError, setLocalError] = useState<string | null>(null);
  const [displayValue, setDisplayValue] = useState<string>(value);

  useEffect(() => {
    if (type === "number" && formatNumberWithCommas) {
      const numericValue = value.replace(/,/g, "");
      if (!isNaN(Number(numericValue))) {
        setDisplayValue(addCommasToNumber(numericValue));
      } else {
        setDisplayValue(value);
      }
    } else {
      setDisplayValue(value);
    }
  }, [value, type, formatNumberWithCommas]);

  const addCommasToNumber = (numStr: string): string => {
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
        return;
      }

      // Update parent with unformatted value
      onChange(unformattedValue);

      // Conditionally format display value
      setDisplayValue(
        formatNumberWithCommas
          ? addCommasToNumber(unformattedValue)
          : unformattedValue
      );
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
