export const getCurrentDate = () => {
  const date = new Date();
  const dateFormat = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(date);
  return dateFormat;
};
