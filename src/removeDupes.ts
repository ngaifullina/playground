export const removeDupes = (str: string): string => {
  return Array.from(new Set(str)).join("");
};
