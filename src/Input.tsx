import React, { useState, ChangeEvent, useEffect } from "react";

type CustomInputType =
  | "number"
  | "noEnglish"
  | "text"
  | "password"
  | "email"
  | "tel"
  | "search"
  | "url"
  | "date"
  | "datetime-local"
  | "month"
  | "time"
  | "week"
  | "color";

interface InputProps {
  value: string | number | null | undefined;
  onChange: (value: string | number) => void;
  placeholder?: string;
  type?: CustomInputType;
  maxLength?: number;
  disabled?: boolean;
  error?: string;
  className?: string;
  formatNumberWithCommas?: boolean;
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
  formatNumberWithCommas = false,
}) => {
  const [displayValue, setDisplayValue] = useState<string>("");

  const addCommasToNumber = (numStr: string): string => {
    if (!numStr) return "";
    return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    const stringValue = value != null ? String(value) : "";
    if (type === "number" && formatNumberWithCommas) {
      const cleanValue = stringValue.replace(/[^0-9]/g, "");
      setDisplayValue(addCommasToNumber(cleanValue));
    } else {
      setDisplayValue(stringValue);
    }
  }, [value, type, formatNumberWithCommas]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value.replace(/,/g, ""); // remove commas

    if (type === "number") {
      inputValue = inputValue.replace(/[^0-9]/g, "");
    } else if (type === "noEnglish") {
      inputValue = inputValue.replace(/[a-zA-Z]/g, "");
    }

    if (maxLength && inputValue.length > maxLength) {
      inputValue = inputValue.slice(0, maxLength);
    }

    if (type === "number") {
      const numericValue = inputValue ? Number(inputValue) : "";
      onChange(numericValue);
      setDisplayValue(
        formatNumberWithCommas ? addCommasToNumber(inputValue) : inputValue
      );
    } else {
      onChange(inputValue);
      setDisplayValue(inputValue);
    }
  };

  const getInputHTMLType = () => {
    if (type === "number" || type === "noEnglish") return "text";
    return type;
  };

  const getInputMode = () => {
    if (type === "number") return "numeric";
    if (type === "tel") return "tel";
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
      {error && <span>{error}</span>}
    </div>
  );
};

export default Input;
