import { FC } from "react";

import styles from "./select.module.scss";

export const Select: FC<{
  children: React.ReactNode;
  name: string;
  value?: string;
  onChange?: () => void;
  label: string;
}> = ({ children, name, value, onChange, label }) => {
  return (
    <div className={styles.selectContainer}>
      <select name={name} id={name} value={value} onChange={onChange}>
        <option>{label}</option>
        {children}
      </select>
    </div>
  );
};
