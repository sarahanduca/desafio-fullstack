"use client";

import { Level } from "@/package/interfaces";
import { FC, MouseEventHandler, useCallback } from "react";
import { useLevelModal } from "../levelModal";

import { Button } from "@/package/components/button";

import styles from "./levelCard.module.scss";
import { deleteLevel } from "@/package/services/deleteLevel";

export const LevelCard: FC<
  Level & {
    isExpanded: boolean;
    onExpand: (id: string) => void;
  }
> = ({ id, level, isExpanded, onExpand }) => {
  const { toggle, setLevelId, mutate } = useLevelModal();

  const handleExpandCard = () => {
    onExpand(id);
  };

  const handleEditLevel = useCallback<MouseEventHandler<HTMLElement>>(
    (event) => {
      event.stopPropagation();
      setLevelId(id);
      toggle();
    },
    [setLevelId, id, toggle]
  );

  const handleDeleteLevel = useCallback<MouseEventHandler<HTMLElement>>(
    async (e) => {
      e.stopPropagation();
      await deleteLevel(id);
      mutate();
    },
    [id, mutate]
  );

  const handleListDevelopersAssociated = () => {
    console.log("Listar todos desenvolvedores associados");
  };

  return (
    <div className={styles.levelCardContainer} onClick={handleExpandCard}>
      <p className={styles.level}>
        Nível: <span>{level}</span>{" "}
      </p>
      <div>
        {isExpanded ? (
          <div className={styles.levelCardOptions}>
            <div>
              <Button onClick={handleEditLevel}>🖋 Editar</Button>
              <Button>📃 Listar todos desenvolvedores associados</Button>
            </div>
            <Button onClick={handleDeleteLevel}>❌ Excluir </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
