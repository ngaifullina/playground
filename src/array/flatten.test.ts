import { flatten } from "./flatten";

describe("flatten number N = ", () => {
  test("empty", () => {
    expect(flatten([])).toEqual([]);
  });

  test("1 element", () => {
    expect(flatten([1])).toEqual([1]);
  });

  test("2 elements", () => {
    expect(flatten([1, [2]])).toEqual([1, 2]);
  });

  test("nested", () => {
    expect(flatten([[1], [[2, 3]], [[[4]]]])).toEqual([1, 2, 3, 4]);
  });
});
