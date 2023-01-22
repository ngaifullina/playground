import { search } from "./search";

describe("search", () => {
  test("0", () => {
    expect(search([1, 3, 6, 13, 17], 13)).toBe(3);
  });
  test("1", () => {
    expect(search([1, 3, 6, 13, 17, 20, 21, 22, 45], 45)).toBe(8);
  });
  test("2", () => {
    expect(search([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 9)).toBe(9);
  });
  test.only("3", () => {
    expect(search([1, 3, 6, 13, 17], 12)).toBe(-1);
  });
});
