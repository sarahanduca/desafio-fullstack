import { FC } from "react";

import styles from "./select.module.scss";

export const Select: FC<{
  children: React.ReactNode;
  name: string;
  value?: string;
  onChange?: () => void;
  label: string;
  disabled?: boolean;
}> = ({ children, name, value, onChange, label, disabled }) => {
  return (
    <div
      className={`${styles.selectContainer} ${
        disabled ? styles.isDisabled : null
      }`}
    >
      <select
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        <option>{label}</option>
        {children}
      </select>
    </div>
  );
};
