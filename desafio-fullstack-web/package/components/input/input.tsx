import { FC } from "react";

import styles from "./input.module.scss";

export const Input: FC<{
  value?: string;
  name: string;
  label: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ value, name, label, onChange, ...props }) => {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        value={value}
        name={name}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};
