"use client";

import { FC, MouseEventHandler, useCallback } from "react";

import type { Developer } from "@/package/interfaces";
import { Button } from "@/package/components/button";
import { useDeveloperModal } from "../developerModal";
import { formatDate } from "@/package/utils/formatDate";

import styles from "./developerCard.module.scss";
import { deleteDeveloper } from "@/package/services";

export const DeveloperCard: FC<{ developer: Developer }> = ({ developer }) => {
  const { id, name, gender, birthday, age, hobby, level } = developer;
  const { openModal, setDeveloperId } = useDeveloperModal();

  const handleEditDeveloper = useCallback(
    (e: any) => {
      e.stopPropagation();
      setDeveloperId(id);
      openModal();
    },
    [id, setDeveloperId, openModal]
  );

  const handleDeleteDeveloper = useCallback(async () => {
    await deleteDeveloper(id);
  }, [id]);

  return (
    <div className={styles.developerCardContainer}>
      <div className={styles.developerCardContent}>
        <p>
          Nome: <span>{name}</span>
        </p>
        <p>
          Gênero: <span>{gender}</span>
        </p>
        <p>
          Idade: <span>{age}</span>
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
