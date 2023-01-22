export const search = (arr: number[], target: number) => {
  let start = 0;
  let end = arr.length;
  let middle = Math.floor(end / 2);

  for (middle; middle <= end && middle >= start; ) {
    if (arr[middle] === target) {
      return middle;
    } else if (start === end) {
      return -1;
    } else if (arr[middle] < target) {
      start = middle + 1;
    } else {
      end = middle - 1;
    }
    middle = Math.floor(start + (end - start) / 2);
  }
};
