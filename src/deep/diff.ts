import { equal } from "./equal";

// return an object that is first object excluding fields of the second object
export const diff = (a: Object, b: Object) => {
  if (typeof a !== typeof b) throw new Error("Type of arguments are different");
  if (typeof a !== "object" || typeof b !== "object")
    throw new Error("Arguments must be objects");

  if (Array.isArray(a) && Array.isArray(b)) {
    return a.filter((ai) => !b.some((bi) => equal(ai, bi)));
  }

  return Object.entries(a).reduce((difference, [k, v]) => {
    if (Array.isArray(v)) {
      difference[k] = diff(v, b[k]);
    }
    if (
      !b.hasOwnProperty(k) ||
      (b[k] !== v && Object.keys(b[k]).length !== 0)
    ) {
      difference[k] = v;
    }
    return difference;
  }, {});
};
