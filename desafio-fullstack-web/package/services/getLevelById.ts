import { Level } from "../interfaces";

export const getLevelById = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/levels/${id}`
  );

  const data: Level = await response.json();
  return data;
};
