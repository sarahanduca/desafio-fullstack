export const getLevels = async (limit: number = 10, page: number = 1) => {
  const response = await fetch(
    `${process.env["NEXT_PUBLIC_API_URL"]}/levels?limit=${limit}&page=${page}`
  );
  const data = await response.json();
  return data;
};
