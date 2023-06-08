type KV = [string, number];
const itemCountCmp = (a: KV, b: KV): number => b[1] - a[1];
const toItem = (a: KV): string => a[0];

export const highestFrequency = (arr: string[]): string => {
  const obj: { [key: string]: number } = {};
  arr.forEach((el) => {
    if (obj[el]) {
      obj[el] = obj[el] + 1;
    } else {
      obj[el] = 1;
    }
  });
  return toItem(Object.entries(obj).sort(itemCountCmp)[0]);
};
