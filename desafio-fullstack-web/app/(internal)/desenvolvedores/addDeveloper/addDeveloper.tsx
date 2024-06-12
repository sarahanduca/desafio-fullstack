"use client";

import { FC } from "react";
import { Button } from "@/package/components/button";
import { useDeveloperModal } from "../developerModal";

export const AddDeveloper: FC = () => {
  const { openModal, setDeveloperId } = useDeveloperModal();

  return (
    <Button
      onClick={(e) => {
        e.stopPropagation();
        setDeveloperId("");
        openModal();
      }}
    >
      Adicionar ✨novo✨ desenvolvedor
    </Button>
  );
};
