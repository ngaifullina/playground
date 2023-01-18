import { fibonacci } from "./fibonacci";

describe("Fibonacci number N = ", () => {
  test("0", () => {
    expect(fibonacci(0)).toBe(0);
  });

  test("1", () => {
    expect(fibonacci(1)).toBe(1);
  });

  test("2", () => {
    expect(fibonacci(2)).toBe(1);
  });

  test("3", () => {
    expect(fibonacci(3)).toBe(2);
  });

  test("4", () => {
    expect(fibonacci(4)).toBe(3);
  });

  test("5", () => {
    expect(fibonacci(5)).toBe(5);
  });
  test("10", () => {
    expect(fibonacci(10)).toBe(55);
  });
  test("-1", () => {
    expect(() => fibonacci(-1)).toThrowError();
  });
});
