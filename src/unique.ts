let arr = [1, 1, 2, 2, 2, 5, 5, 5, 2, 7];
// дан массив  arr = [1,1,2,2,2,5,5,5,2,7]
// нужно вернуть уникальный массив отсортированный по частоте встречаемости
// 2 встречается чаще всего, потом 5 и тд
// ([2,5,1,7] )

const unique = (arr: number[]) => {
  const itemCounts: Record<number, number> = {};

  arr.forEach((el) => {
    if (!itemCounts[el]) {
      itemCounts[el] = 1;
    } else {
      itemCounts[el] = itemCounts[el] + 1;
    }
  });

  return Object.entries(itemCounts).sort(itemCountCmp).map(toItem);
};

type CNT = Record<number, number>;

const countReducer = (counts: CNT, n: number): CNT => {
  if (!counts[n]) {
    counts[n] = 1;
  } else {
    counts[n] = counts[n] + 1;
  }
  return counts;
};

const counts = (arr: number[]): Record<number, number> =>
  arr.reduce((acc, item) => {
    if (!acc[item]) {
      acc[item] = 1;
    } else {
      acc[item] = acc[item] + 1;
    }
    return acc;
  }, {});

type KV = [string, number];
const itemCountCmp = (a: KV, b: KV): number => b[1] - a[1];
const toItem = (a: KV): number => +a[0];

// const unique = (arr: number[]) =>
//   Object.entries(counts(arr)).sort(itemCountCmp).map(toItem);

const res = unique(arr);
console.log(res);
