export const deleteLevel = async (id: string) => {
  const response = await fetch(
    `${process.env["NEXT_PUBLIC_API_URL"]}/levels/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error);
  }
};
