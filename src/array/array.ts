export const repeatElementAtIndex = <T extends number>(
  times: number,
  index: number,
  arr: T[]
) => {
  // validation
  if (index < 0 || index > arr.length) {
    throw new Error(`Expected index inside arr bounds 0, got ${index}`);
  }

  if (times < 0) {
    throw new Error(`Expected times > 0, got ${times}`);
  }

  // shortcuts
  if (times === 1 || arr.length === 0) {
    return arr;
  }

  const newValues = new Array(times).fill(arr[index]);
  console.log(newValues, "newValues");
  arr.splice(index, 1, ...newValues);
  console.log(arr, "arr");
  return arr;
};

export const repeatElementAtIndexDeep = <T extends number>(
  times: number,
  index: number,
  arr: T[]
) => {
  // validation
  if (index < 0 || index > arr.length) {
    throw new Error(`Expected index inside arr bounds 0, got ${index}`);
  }

  if (times < 0) {
    throw new Error(`Expected times > 0, got ${times}`);
  }

  // shortcuts
  if (times === 1 || arr.length === 0) {
    return arr;
  }

  const newValues = new Array(times).fill(arr[index]);
  console.log(newValues, "newValues");
  arr.splice(index, 1, ...newValues);
  console.log(arr, "arr");
  return arr;
};
// repeatElementAtIndex(2, 3, [1, 2, 3, 4, 5]);
