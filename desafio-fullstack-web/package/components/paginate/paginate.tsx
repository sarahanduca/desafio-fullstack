import { FC } from "react";

import styles from "./paginate.module.scss";
import { useLevelModal } from "@/app/(internal)/niveis/levelModal";
import { useDeveloperModal } from "@/app/(internal)/desenvolvedores/developerModal";

interface PaginateProps {
  type: "level" | "developer";
}

export const Paginate: FC<PaginateProps> = ({ type }) => {
  const contextMap = {
    level: useLevelModal,
    developer: useDeveloperModal,
  };

  const { page, meta, nextPage, prevPage } = contextMap[type]();

  return (
    <div className={styles.paginationContainer}>
      {page !== 1 ? <button onClick={() => prevPage()}>◀</button> : null}
      <p>{page}</p>
      {meta.last_page !== page ? (
        <button onClick={() => nextPage()}>▶</button>
      ) : null}
    </div>
  );
};
