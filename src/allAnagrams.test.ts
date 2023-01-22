import { allAnagrams } from "./allAnagrams";

describe("allAnagrams", () => {
  test("0", () => {
    expect(allAnagrams(["abcd", "bdac", "cabd"])).toBe(true);
  });
  test("1", () => {
    expect(allAnagrams(["abcd", "bdXc", "cabd"])).toBe(false);
  });
  test("2", () => {
    expect(allAnagrams(["aab", "aab"])).toBe(true);
  });
  test("3", () => {
    expect(allAnagrams(["aab", "abb"])).toBe(false);
  });
});
