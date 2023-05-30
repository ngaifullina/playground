import { isBalanced } from "./isBalanced";

describe("isBalanced", () => {
  test("0", () => {
    expect(isBalanced("(x + y) - (4)")).toBe(true);
  });
  test("0", () => {
    expect(isBalanced("((")).toBe(false);
  });
  test("1", () => {
    expect(isBalanced("(((10 ) ()) ((?)(:)))")).toBe(true);
  });
  test("2", () => {
    expect(isBalanced("[{()}]")).toBe(true);
  });
  test("3", () => {
    expect(isBalanced("(50)(")).toBe(false);
  });
  test("4", () => {
    expect(isBalanced("[{]}")).toBe(false);
  });
});
