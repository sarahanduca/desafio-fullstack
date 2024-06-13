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
  page: 1,
  nextPage: () => {},
  prevPage: () => {},
  meta: {
    total: 0,
    per_page: 0,
    current_page: 0,
    last_page: 0,
  },
});

export const useLevelModal = () => {
  const context = useContext(LevelModalContext);

  return context;
};

export const LevelModalProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [levelId, setId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const { data, error, isLoading, mutate } = useSWR(
    `${process.env["NEXT_PUBLIC_API_URL"]}/levels?page=${page}`,
    fetcher
  );

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);
  const nextPage = useCallback(
    () =>
      setPage((prevPage) => {
        return prevPage + 1;
      }),
    []
  );
  const prevPage = useCallback(
    () => setPage((prevPage) => Math.max(prevPage - 1, 1)),
    []
  );

  const setLevelId = useCallback((id: string | null) => setId(id), []);

  return (
    <LevelModalContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
        toggle,
        levels: data?.data || [],
        meta: data?.meta || {},
        page,
        nextPage,
        prevPage,
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
