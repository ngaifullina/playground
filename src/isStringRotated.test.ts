import { isStringRotated } from "./isStringRotated";

describe(" ", () => {
  test("0", () => {
    expect(isStringRotated("javascript", "scriptjava")).toBe(true);
  });

  test("1", () => {
    expect(isStringRotated("javascript", "iptjavascr")).toBe(true);
  });

  test("2", () => {
    expect(isStringRotated("javascript", "java")).toBe(false);
  });
});
