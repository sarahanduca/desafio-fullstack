export const deleteDeveloper = async (id: string) => {
  const response = await fetch(
    `${process.env["NEXT_PUBLIC_API_URL"]}/developer/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao deletar desenvolvedor");
  }

  return response.json();
};
