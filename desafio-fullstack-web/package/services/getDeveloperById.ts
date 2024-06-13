export const getDeveloperById = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/developers/${id}`
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar desenvolvedor");
  }

  const data = await response.json();
  return data;
};
