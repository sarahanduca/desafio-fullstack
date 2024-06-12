import { Level } from "../interfaces";

export const updateLevel = async (id: string, level: Omit<Level, "id">) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/levels/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(level),
    }
  );

  if (response.ok) {
    return response.json();
  }

  throw new Error("Erro ao atualizar nível");
};
