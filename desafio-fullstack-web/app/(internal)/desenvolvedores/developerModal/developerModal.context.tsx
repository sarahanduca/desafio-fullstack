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
  const { data, error, isLoading, mutate } = useSWR(
    `${process.env["NEXT_PUBLIC_API_URL"]}/developer`,
    fetcher
  );

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

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
      }}
    >
      {children}
    </DeveloperModalContext.Provider>
  );
};
