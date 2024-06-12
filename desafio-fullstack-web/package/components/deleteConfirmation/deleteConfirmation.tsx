"use client";

import { FC, useCallback } from "react";
import { Button } from "../button";

import styles from "./deleteConfirmation.module.scss";

export const DeleteConfirmation: FC<{
  onConfirm: () => void;
  onCancel: () => void;
  category: "nivel" | "desenvolvedor";
}> = ({ onConfirm, onCancel, category }) => {
  const handleConfirm = useCallback(() => {
    onConfirm();
  }, [onConfirm]);

  const handleCancel = useCallback(() => {
    onCancel();
  }, [onCancel]);

  return (
    <div className={styles.deleteConfirmationContainer}>
      <p>Tem certeza que deseja excluir este? {category}</p>
      <div className={styles.deleteConfirmationButtons}>
        <Button onClick={handleConfirm}>Sim</Button>
        <Button onClick={handleCancel}>Não</Button>
      </div>
    </div>
  );
};
