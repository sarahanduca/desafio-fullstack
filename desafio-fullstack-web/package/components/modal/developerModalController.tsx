"use client";

import { useDeveloperModal } from "@/app/(internal)/desenvolvedores/developerModal";
import { FC } from "react";

export const DeveloperModalController: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isOpen } = useDeveloperModal();

  return <>{isOpen && <div>{children}</div>}</>;
};
