"use client";

import { FC, useState } from "react";

import styles from "./header.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header: FC = () => {
  const route = usePathname();
  const [isSelected, setIsSelected] = useState<"level" | "developer">(
    route === "/niveis" ? "level" : "developer"
  );

  return (
    <div className={styles.headerContainer}>
      <Link
        href={"/niveis"}
        className={`${styles.redirectLink} ${
          isSelected == "level" && styles.isSelected
        }`}
        onClick={() => setIsSelected("level")}
      >
        Níveis
      </Link>

      <Link
        href={"/desenvolvedores"}
        className={`${styles.redirectLink} ${
          isSelected == "developer" && styles.isSelected
        }`}
        onClick={() => setIsSelected("developer")}
      >
        Desenvolvedores
      </Link>
      <div
        className={`${styles.underline} ${
          isSelected === "level"
            ? styles.underlineLevel
            : styles.underlineDeveloper
        }`}
      ></div>
    </div>
  );
};
