"use client";

import {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import useSWR from "swr";

import type { LevelModal } from "@/package/interfaces";
import { fetcher } from "@/package/utils";

const LevelModalContext = createContext<LevelModal>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
  toggle: () => {},
  levels: [],
  mutate: async () => {},
  isLoading: false,
  setLevelId: () => {},
});

export const useLevelModal = () => {
  const context = useContext(LevelModalContext);

  return context;
};

export const LevelModalProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [levelId, setId] = useState("");
  const { data, error, isLoading, mutate } = useSWR(
    `${process.env["NEXT_PUBLIC_API_URL"]}/levels`,
    fetcher
  );

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const setLevelId = useCallback((id: string) => setId(id), []);

  return (
    <LevelModalContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
        toggle,
        levels: data?.data || [],
        mutate,
        error,
        isLoading,
        levelId,
        setLevelId,
      }}
    >
      {children}
    </LevelModalContext.Provider>
  );
};
