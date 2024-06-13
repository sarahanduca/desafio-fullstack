export const formatDate = (date: string) => {
  const dateOnly = date.split("T")[0];
  const [year, month, day] = dateOnly.split("-");

  return new Date(
    Date.UTC(Number(year), Number(month) - 1, Number(day) + 1)
  ).toLocaleDateString("pt-BR");
};
