import { Developer } from ".";

export interface DeveloperFromBD extends Developer {
  age: string;
  level: {
    level: string;
    id: string;
  };
}
