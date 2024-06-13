import { KeyedMutator } from "swr";
import { Level, Meta } from ".";

export interface LevelModal {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  toggle: () => void;
  levelId?: string | null;
  levels: Level[];
  mutate: KeyedMutator<any>;
  error?: Error;
  isLoading: boolean;
  setLevelId: (id: string | null) => void;
  meta: Meta;
  page: number;
  nextPage: () => void;
  prevPage: () => void;
}
