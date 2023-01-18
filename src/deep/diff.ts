// TODO return an object that is first object excluding fields of the second object
import { equal } from "./equal";

export const diff = (a, b) => {
  // todo describe in doc and write test
  if (typeof a !== "object") throw new Error("A must be an object");
  if (typeof b !== "object") throw new Error("B must be an object");

  if (Array.isArray(a)) {
    return a.filter((ai) => !b.some((bi) => equal(ai, bi)));
  }

  return Object.entries(a).reduce((difference, [k, v]) => {
    if (Array.isArray(v)) {
      difference[k] = diff(v, b[k]);
    } else if (
      !b.hasOwnProperty(k) ||
      (b[k] !== v && Object.keys(b[k]).length !== 0)
    ) {
      difference[k] = v;
    } else {
      difference[k] = v;
    }
    return difference;
  }, {});
};
