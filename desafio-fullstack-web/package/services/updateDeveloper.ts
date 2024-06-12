import { Developer } from "../interfaces";

export const updateDeveloper = async (
  id: string,
  developer: Omit<Developer, "id">
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/developer/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(developer),
    }
  );

  if (response.ok) {
    return response.json();
  }

  throw new Error("Erro ao atualizar desenvolvedor");
};
