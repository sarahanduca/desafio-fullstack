"use client";

import { FC, useCallback } from "react";

import type { Developer } from "@/package/interfaces";
import { Button } from "@/package/components/button";
import { useDeveloperModal } from "../developerModal";
import { formatDate } from "@/package/utils/formatDate";

import styles from "./developerCard.module.scss";

export const DeveloperCard: FC<{ developer: Developer }> = ({ developer }) => {
  const { id, name, gender, birthday, age, hobby, level } = developer;
  const { toggle, closeModal, setDeveloperId } = useDeveloperModal();

  const handleEditDeveloper = useCallback(() => {
    setDeveloperId(id);
    toggle();
  }, [id, setDeveloperId, toggle]);

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
        <Button>❌ Excluir</Button>
      </div>
    </div>
  );
};
