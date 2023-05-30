import { removeDupes } from "./removeDupes";

describe("removeDupes", () => {
  test("", () => {
    expect(removeDupes("abcddbca")).toEqual("abcd");
  });

  test("", () => {
    expect(removeDupes("abcd")).toEqual("abcd");
  });

  test("", () => {
    expect(removeDupes("aabbccdd")).toEqual("abcd");
  });

  test("", () => {
    expect(removeDupes("abababcdcdcd")).toEqual("abcd");
  });
  test("", () => {
    expect(removeDupes("aAaBabcdcdcd")).toEqual("aABbcd");
  });
});
