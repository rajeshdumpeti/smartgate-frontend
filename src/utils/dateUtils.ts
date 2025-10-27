// src/utils/dateUtils.ts
export const getFormattedDateTime = (): string => {
  const currentDate = new Date();
  return currentDate.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
