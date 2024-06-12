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

import type { DeveloperModal } from "@/package/interfaces";
import { fetcher } from "@/package/utils";

const DeveloperModalContext = createContext<DeveloperModal>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
  toggle: () => {},
  developers: [],
  mutate: async () => {},
  isLoading: false,
  setDeveloperId: () => {},
  page: 1,
  nextPage: () => {},
  prevPage: () => {},
});

export const useDeveloperModal = () => {
  const context = useContext(DeveloperModalContext);

  return context;
};

export const DeveloperModalProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [developerId, setId] = useState("");
  const [page, setPage] = useState(1);

  const { data, error, isLoading, mutate } = useSWR(
    `${process.env["NEXT_PUBLIC_API_URL"]}/developer?page=${page}&limit=9`,
    fetcher
  );

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const nextPage = useCallback(
    () =>
      setPage((prevPage) => {
        const limit = data?.meta.last_page || 1;
        return Math.min(prevPage + 1, limit);
      }),
    [data?.meta.last_page]
  );
  const prevPage = useCallback(
    () => setPage((prevPage) => Math.max(prevPage - 1, 1)),
    []
  );

  const setDeveloperId = useCallback((id: string) => setId(id), []);

  return (
    <DeveloperModalContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
        toggle,
        developers: data?.data || [],

        mutate,
        error,
        isLoading,
        developerId,
        setDeveloperId,
        page,
        nextPage,
        prevPage,
      }}
    >
      {children}
    </DeveloperModalContext.Provider>
  );
};
