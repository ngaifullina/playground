import { number } from "./sort";
describe("asc", () => {
  test("singleton array", () => {
    expect(number.asc([1])).toEqual([1]);
  });

  test("empty array", () => {
    expect(number.asc([])).toEqual([]);
  });

  test("", () => {
    expect(number.asc([5, 4, 3])).toEqual([3, 4, 5]);
  });
});

describe("desc", () => {
  test("", () => {
    expect(number.desc([3, 4, 5])).toEqual([5, 4, 3]);
  });
});
