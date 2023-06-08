export const arraySubset = (source: number[], subset: number[]): boolean => {
  let indexedSourse = {};

  source.forEach((el) => {
    if (indexedSourse[el]) {
      indexedSourse[el] = indexedSourse[el] + 1;
    } else {
      indexedSourse[el] = 1;
    }
  });

  return subset.every((el) => {
    if (!indexedSourse[el] || indexedSourse[el] <= 0) {
      return false;
    } else {
      indexedSourse[el] = indexedSourse[el] - 1;
      return true;
    }
  });
};
