export const isStringRotated = (source: string, test: string): boolean => {
  if (source.length !== test.length) return false;
  return Array.from(source).every((el) => test.includes(el));
};
