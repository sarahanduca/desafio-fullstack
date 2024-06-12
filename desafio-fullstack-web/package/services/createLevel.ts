import { Level } from "../interfaces";

export const createLevel = async (level: Omit<Level, "id">) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/levels`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(level),
  });

  if (response.ok) {
    return response.json();
  }

  throw new Error("Erro ao criar nível");
};
