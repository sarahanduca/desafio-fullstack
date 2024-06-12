import { KeyedMutator } from "swr";
import { Developer } from ".";

export interface DeveloperModal {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  toggle: () => void;
  developerId?: string;
  developers: Developer[];
  mutate: KeyedMutator<any>;
  error?: Error;
  isLoading: boolean;
  setDeveloperId: (id: string) => void;
}
