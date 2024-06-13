"use client";
import { FC } from "react";
import { useDeveloperModal } from "../developerModal";

import styles from "./developerList.module.scss";
import { DeveloperCard } from "../developerCard";
import { Paginate } from "@/package/components/paginate";
import { DeveloperFromBD } from "@/package/interfaces";

export const DeveloperList: FC = () => {
  const { isLoading, error, developers } = useDeveloperModal();

  if (isLoading) {
    return <div className={styles.listFeedback}>Carregando...</div>;
  }

  if (error) {
    return <div className={styles.listFeedback}>Error: {error.message}</div>;
  }

  if (developers.length > 0) {
    return (
      <div className={styles.developerListContainer}>
        <div className={styles.listContent}>
          {developers.map((developer) => (
            <DeveloperCard
              key={developer.id}
              developer={developer as DeveloperFromBD}
            />
          ))}
        </div>

        <div className={styles.pagination}>
          <Paginate type="developer" />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.listFeedback}>Nenhum desenvolvedor encontrado</div>
  );
};
