export const getDevelopers = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/developers`);
  const data = await response.json();
  return data;
};
