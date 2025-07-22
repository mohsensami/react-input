import React, { useState, ChangeEvent } from "react";

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    if (type === "number") {
      inputValue = inputValue.replace(/[^0-9]/g, "");
    } else if (type === "letters") {
      inputValue = inputValue.replace(/[^a-zA-Zآ-یء\s]/g, "");
    }

    if (maxLength && inputValue.length > maxLength) {
      inputValue = inputValue.slice(0, maxLength);
    }

    onChange(inputValue);
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
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
      />
      {(error || localError) && <span>{error || localError}</span>}
    </div>
  );
};

export default Input;
