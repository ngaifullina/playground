export const equal = <T>(a: T, b: T): boolean => {
  // Case 1: both nulls. A subset of Case 2, only for Typescript inference
  if (a === null || b === null) return a === b;
  // Case 2: shallow equal
  if (a === b) return true;
  // Case 3: arrays, deep
  if (Array.isArray(a) && Array.isArray(b) && a.length === b.length)
    return a.every((ai, i) => equal(ai, b[i]));
  // Case 4: objects, deep
  if (
    typeof a === "object" &&
    typeof b === "object" &&
    !Array.isArray(a) &&
    !Array.isArray(b)
  ) {
    return (
      Object.keys(a).every((k) => b.hasOwnProperty(k)) &&
      Object.keys(b).every((k) => a.hasOwnProperty(k)) &&
      Object.keys(a).every((k) => equal(a[k], b[k]))
    );
  }
  // Default: objects did not match any equality patterns
  return false;
};
