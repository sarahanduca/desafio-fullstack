"use client";

import { Button } from "@/package/components/button";
import { useLevelModal } from "../levelModal";

export const AddLevel = () => {
  const { openModal, setLevelId } = useLevelModal();

  return (
    <Button
      onClick={(e) => {
        e.stopPropagation();
        setLevelId(null);
        openModal();
      }}
    >
      Adicionar ✨novo✨ nível
    </Button>
  );
};
