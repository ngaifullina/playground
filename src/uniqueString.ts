const isUniqueString = (str: string): boolean => {
  return new Set(str).size === str.length;
};

const uniqueArr = (arr: Array<number>): Array<number> => {
  return [...new Set(arr)];
  // return Array.from(new Set(arr));
};

console.log(uniqueArr([1, 1, 1, 2, 3, 4, 4, 4, 4]));
console.log(isUniqueString("abcdef")); // -> true
