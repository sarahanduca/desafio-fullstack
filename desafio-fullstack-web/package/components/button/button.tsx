import { FC, MouseEventHandler } from "react";

import styles from "./button.module.scss";

export const Button: FC<{
  children: string;
  onClick?: MouseEventHandler;
  type?: "button" | "submit" | "reset" | undefined;
}> = ({ children, onClick, type }) => {
  return (
    <button className={styles.buttonContainer} onClick={onClick} type={type}>
      {children}
    </button>
  );
};
