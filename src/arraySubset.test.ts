import { arraySubset } from "./arraySubset";
describe("arraySubset", () => {
  test("", () => {
    expect(arraySubset([5, 5, 2, 1, 3], [1, 2, 3])).toBe(true);
  });
  test("", () => {
    expect(arraySubset([2, 1, 1, 3], [1, 2, 3])).toBe(true);
  });
  test("", () => {
    expect(arraySubset([1, 1, 1, 3], [1, 3, 3])).toBe(false);
  });

  test("", () => {
    expect(arraySubset([1, 2], [1, 2, 3])).toBe(false);
  });
});
