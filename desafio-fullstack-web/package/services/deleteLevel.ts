export const deleteLevel = async (id: string) => {
  const response = await fetch(
    `${process.env["NEXT_PUBLIC_API_URL"]}/levels/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao deletar nível");
  }

  return response.json();
};
