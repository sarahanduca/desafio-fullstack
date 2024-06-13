import { FC } from "react";

import styles from "./input.module.scss";

export const Input: FC<{
  value?: string;
  name: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ value, name, label, onChange, placeholder, disabled, ...props }) => {
  return (
    <div
      className={`${styles.inputContainer} ${
        disabled ? styles.inputDisabled : null
      }`}
    >
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        {...props}
      />
    </div>
  );
};
