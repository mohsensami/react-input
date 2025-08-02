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
  value: string;
  onChange: (value: string) => void;
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

  useEffect(() => {
    if (type === "number" && formatNumberWithCommas) {
      const cleanValue = value.toString().replace(/[^0-9]/g, "");
      setDisplayValue(addCommasToNumber(cleanValue));
    } else {
      setDisplayValue(value);
    }
  }, [value, type, formatNumberWithCommas]);

  const addCommasToNumber = (numStr: string): string => {
    if (!numStr) return "";
    return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value.replace(/,/g, "");

    if (type === "number") {
      inputValue = inputValue.replace(/[^0-9]/g, "");
    } else if (type === "noEnglish") {
      inputValue = inputValue.replace(/[a-zA-Z]/g, "");
    }

    if (maxLength && inputValue.length > maxLength) {
      inputValue = inputValue.slice(0, maxLength);
    }

    if (type === "number") {
      onChange(Number(inputValue || "0"));
      if (formatNumberWithCommas) {
        setDisplayValue(addCommasToNumber(inputValue));
      } else {
        setDisplayValue(inputValue);
      }
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
