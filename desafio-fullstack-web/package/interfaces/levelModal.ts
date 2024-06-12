import { KeyedMutator } from "swr";
import { Level } from ".";

export interface LevelModal {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  toggle: () => void;
  levelId?: string;
  levels: Level[];
  mutate: KeyedMutator<any>;
  error?: Error;
  isLoading: boolean;
  setLevelId: (id: string) => void;
}