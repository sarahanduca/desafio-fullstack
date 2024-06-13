import { Developer } from "../interfaces";

export const createDeveloper = async (developer: Omit<Developer, "id">) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/developers`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(developer),
    }
  );

  if (response.ok) {
    return response.json();
  }

  throw new Error("Erro ao criar desenvolvedor");
};
