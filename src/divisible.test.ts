import { divisible } from "./divisible";

test("lowers to nearest % 5", () => {
  expect(divisible.lower(41, 5)).toBe(40);
});

test("lowers to nearest % 5", () => {
  expect(divisible.lower(42, 5)).toBe(40);
});

test("lowers 43 to nearest % 5", () => {
  expect(divisible.lower(43, 5)).toBe(40);
});

test("lowers to nearest % 5", () => {
  expect(divisible.lower(44, 5)).toBe(40);
});

test("upper 43 to nearest % 5", () => {
  expect(divisible.upper(43, 5)).toBe(45);
});

test("upper to nearest % 5", () => {
  expect(divisible.upper(44, 5)).toBe(45);
});
