"use client";

import { FC, useCallback, useEffect, useState } from "react";
import { useLevelModal } from "./levelModal.context";

import styles from "./levelModal.module.scss";
import { Input } from "@/package/components/input";
import { Button } from "@/package/components/button";
import { createLevel } from "@/package/services/createLevel";
import { Level } from "@/package/interfaces";
import { getLevelById } from "@/package/services/getLevelById";
import { updateLevel } from "@/package/services/updateLevel";

export const LevelModal: FC = () => {
  const { levelId, closeModal, mutate, isOpen, isLoading } = useLevelModal();
  const [formValues, setFormValues] = useState<Omit<Level, "id"> | null>(null);

  useEffect(() => {
    if (levelId) {
      const fetchLevel = async () => {
        const level = await getLevelById(levelId);

        if (level) {
          setFormValues(level);
        }
      };

      fetchLevel();
    }
  }, [levelId]);

  const onClickOutside = useCallback(() => {
    setFormValues({ level: "" });

    closeModal();
  }, [closeModal]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("click", onClickOutside);

      return () => {
        window.removeEventListener("click", onClickOutside);
      };
    }
  }, [isOpen, onClickOutside]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setFormValues((prev) => ({ ...prev!, [name]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: { preventDefault: () => void }) => {
      e.preventDefault();
      if (formValues)
        levelId
          ? await updateLevel(levelId, formValues)
          : await createLevel(formValues);

      mutate();
      closeModal();
    },
    [closeModal, formValues, levelId, mutate]
  );

  return (
    <>
      <div
        onClick={(e) => e.stopPropagation()}
        className={styles.levelModalContainer}
      >
        <h2>{`${levelId ? "Editar nível" : "Adicionar nível"}`}</h2>
        <div className={styles.modalForm}>
          <form action="submit" onSubmit={handleSubmit}>
            <Input
              name="level"
              label="Nível"
              value={formValues?.level}
              onChange={handleInputChange}
            />
            <Button type="submit">Salvar</Button>
          </form>
        </div>
      </div>
      <div className={styles.modalBackground} onClick={onClickOutside}></div>
    </>
  );
};
