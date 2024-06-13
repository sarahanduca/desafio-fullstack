"use client";

import { FC, useState } from "react";
import { Level } from "@/package/interfaces";
import { LevelCard } from "../levelCard";
import { useLevelModal } from "../levelModal";
import styles from "./levelList.module.scss";
import { Paginate } from "@/package/components/paginate";

export const LevelList: FC = () => {
  const { levels, isLoading, error } = useLevelModal();
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const handleExpandCard = (id: string) => {
    setExpandedCardId((prevId) => (prevId === id ? null : id));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <>
      <div className={styles.levelList}>
        {levels.map(({ id, level }: Level) => {
          return (
            <LevelCard
              key={id}
              id={id}
              level={level}
              isExpanded={id === expandedCardId}
              onExpand={handleExpandCard}
            />
          );
        })}

        <div className={styles.pagination}>
          <Paginate type="level" />
        </div>
      </div>
    </>
  );
};
