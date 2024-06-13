"use client";

import { FC, MouseEventHandler, useCallback } from "react";

import type { DeveloperFromBD as Developer } from "@/package/interfaces";
import { Button } from "@/package/components/button";
import { useDeveloperModal } from "../developerModal";
import { formatDate } from "@/package/utils/formatDate";

import styles from "./developerCard.module.scss";
import { deleteDeveloper } from "@/package/services";

export const DeveloperCard: FC<{ developer: Developer }> = ({ developer }) => {
  const { id, name, gender, birthday, age, hobby, level } = developer;
  const { openModal, setDeveloperId, mutate } = useDeveloperModal();
  const genderMap: { [key: string]: string } = {
    M: "Masculino",
    F: "Feminino",
  };

  const handleEditDeveloper = useCallback<MouseEventHandler<HTMLElement>>(
    (e) => {
      e.stopPropagation();
      setDeveloperId(id);
      openModal();
    },
    [id, setDeveloperId, openModal]
  );

  const handleDeleteDeveloper = useCallback(async () => {
    try {
      await deleteDeveloper(id);
      mutate();
    } catch (error) {
      window.alert(error);
    }
  }, [id, mutate]);

  return (
    <div className={styles.developerCardContainer}>
      <div className={styles.developerCardContent}>
        <p>
          Nome: <span>{name}</span>
        </p>
        <p>
          Gênero: <span>{genderMap[gender]}</span>
        </p>
        <p>
          Idade: <span>{age} anos</span>
        </p>
        <p>
          Nível: <span>{level.level}</span>
        </p>
        <p>
          Aniversário: <span>{formatDate(birthday)}</span>
        </p>
        <p>
          Hobby: <span>{hobby}</span>
        </p>
      </div>

      <div className={styles.developerCardButtons}>
        <Button onClick={handleEditDeveloper}> 🖋 Editar </Button>
        <Button onClick={handleDeleteDeveloper}>❌ Excluir</Button>
      </div>
    </div>
  );
};
