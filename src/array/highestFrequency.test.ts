import { highestFrequency } from "./highestFrequency";

describe(" ", () => {
  test("0", () => {
    expect(highestFrequency(["a", "b", "c", "c", "d", "e"])).toBe("c");
  });

  test("1", () => {
    expect(highestFrequency(["abc", "def", "abc", "def", "abc"])).toBe("abc");
  });

  test("2", () => {
    expect(highestFrequency(["abc", "def"])).toBe("abc");
  });

  test("3", () => {
    expect(
      highestFrequency([
        "abc",
        "abc",
        "def",
        "def",
        "def",
        "ghi",
        "ghi",
        "ghi",
        "ghi",
      ])
    ).toBe("ghi");
  });
});
