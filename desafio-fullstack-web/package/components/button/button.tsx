import { FC, MouseEventHandler } from "react";

import styles from "./button.module.scss";

export const Button: FC<{
  children: string;
  onClick?: MouseEventHandler;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
}> = ({ children, onClick, type, disabled }) => {
  return (
    <button
      className={`${styles.buttonContainer} ${
        disabled ? styles.isDisabled : null
      }`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
