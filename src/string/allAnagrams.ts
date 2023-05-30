export const allAnagrams = (arr: string[]): boolean => {
  const sorted = arr.map((str: string) => str.split("").sort().join(""));
  return sorted.every((el) => el === sorted[0]);
};
