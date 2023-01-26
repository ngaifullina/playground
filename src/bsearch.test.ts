import { repeatElementAtIndex } from "./array";
import { search } from "./bsearch";

const ARR = [0, 10, 20, 39, 40, 50, 60, 70, 80, 90];

describe("Binary search", () => {
  test("returns -1 when element not found", () => {
    expect(search(ARR, -10)).toBe(-1);
  });

  test("finds target element in all positions", () => {
    testArraySearch(ARR);
  });

  describe("finds first entry of a target element if it is duplicated", () => {
    test.only("twice", () => testArraySearchWithDuplication(ARR, 2));
    test("thrice", () => testArraySearchWithDuplication(ARR, 3));
  });

  const testArraySearchWithDuplication = (
    arr: number[],
    duplicationFactor: number
  ) =>
    arr.forEach((value, index) => {
      const arrayWithDuplicatedElement = repeatElementAtIndex(
        duplicationFactor,
        index,
        ARR
      );
      expect(search(arrayWithDuplicatedElement, value)).toBe(index);
    });

  const testArraySearch = (arr: number[]) =>
    arr.forEach((value, index) => expect(search(arr, value)).toBe(index));
});
