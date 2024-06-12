"use client";
import { FC } from "react";
import { useDeveloperModal } from "../developerModal";

import styles from "./developerList.module.scss";
import { DeveloperCard } from "../developerCard";

export const DeveloperList: FC = () => {
  const { isLoading, error, developers } = useDeveloperModal();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (developers.length > 0) {
    return (
      <div className={styles.developerListContainer}>
        {developers.map((developer) => (
          <DeveloperCard key={developer.id} developer={developer} />
        ))}
      </div>
    );
  }
};
