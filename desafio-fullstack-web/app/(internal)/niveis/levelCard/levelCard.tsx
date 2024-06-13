"use client";

import { Developer, Level } from "@/package/interfaces";
import { FC, MouseEventHandler, useCallback, useState } from "react";
import { useLevelModal } from "../levelModal";

import { Button } from "@/package/components/button";

import styles from "./levelCard.module.scss";
import { deleteLevel } from "@/package/services/deleteLevel";
import { getDevelopersByLevel } from "@/package/services/getDevelopersByLevel";

export const LevelCard: FC<
  Level & {
    isExpanded: boolean;
    onExpand: (id: string) => void;
  }
> = ({ id, level, isExpanded, onExpand }) => {
  const { toggle, setLevelId, mutate } = useLevelModal();

  const [developers, setDevelopers] = useState<[] | null>(null);

  const handleExpandCard = () => {
    setDevelopers(null);
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
      try {
        await deleteLevel(id);
        mutate();
      } catch (error) {
        window.alert(error);
      }
    },
    [id, mutate]
  );

  const handleListDevelopersAssociated = useCallback<
    MouseEventHandler<HTMLElement>
  >(
    async (e) => {
      e.stopPropagation();
      try {
        const developersAssociated = await getDevelopersByLevel(id);
        setDevelopers(developersAssociated);
      } catch (error) {
        window.alert(error);
      }
    },
    [id]
  );

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
              <Button onClick={handleListDevelopersAssociated}>
                📃 Listar todos desenvolvedores associados
              </Button>
            </div>
            <Button onClick={handleDeleteLevel}>❌ Excluir </Button>
          </div>
        ) : null}
      </div>

      {developers ? (
        developers.length > 0 ? (
          <div className={styles.associatedDevelopersList}>
            {developers.map(({ id, name }: Developer) => (
              <p key={id}>{name}</p>
            ))}
          </div>
        ) : (
          <div className={styles.associatedDevelopersList}>
            Não há desenvolvedores associados
          </div>
        )
      ) : null}
    </div>
  );
};
