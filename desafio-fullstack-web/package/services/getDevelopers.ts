export const getDevelopers = async (page: number = 1, limit: number = 10) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/developer?limit=${limit}&page=${page}`
  );
  const data = await response.json();
  return data;
};
