export const search = (arr: number[], target: number): number => {
  let start = 0;
  let end = arr.length - 1;
  let middle;

  if (target < arr[start] || target > arr[end]) return -1;
  do {
    middle = Math.floor((start + end) / 2);
    if (arr[middle] === target) {
      return middle;
    } else if (arr[middle] < target) {
      start = middle + 1;
    } else {
      end = middle - 1;
    }
  } while (start <= end);

  return -1;
};
