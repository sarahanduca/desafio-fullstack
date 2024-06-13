import { FC } from "react";

import styles from "./input.module.scss";

export const Input: FC<{
  value?: string;
  name: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({
  value,
  name,
  label,
  onChange,
  placeholder,
  disabled,
  type = "text",
}) => {
  return (
    <div
      className={`${styles.inputContainer} ${
        disabled ? styles.inputDisabled : null
      }`}
    >
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required
        data-date-format={type == "date" ? "DD MMMM YYYY" : null}
      />
    </div>
  );
};
