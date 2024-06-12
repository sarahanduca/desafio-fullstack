"use client";

import { useLevelModal } from "@/app/(internal)/niveis/levelModal/levelModal.context";
import { FC } from "react";

export const LevelModalController: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isOpen } = useLevelModal();

  return <>{isOpen && <div>{children}</div>}</>;
};
