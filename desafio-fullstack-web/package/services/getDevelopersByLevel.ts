export const getDevelopersByLevel = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/levels/${id}/developers`
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar desenvolvedores");
  }

  const data = await response.json();
  return data;
};
