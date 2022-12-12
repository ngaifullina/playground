import { equal } from "./equal";

describe("Deep equal should cover case of", () => {
  test("integer, negative", () => {
    expect(equal(-1, -1)).toBe(true);
  });

  test("string", () => {
    expect(equal("a", "a")).toBe(true);
  });

  test("null", () => {
    expect(equal(null, null)).toBe(true);
  });

  test("null and empty object", () => {
    expect(equal(null, {})).toBe(false);
  });

  test("undefined", () => {
    expect(equal(undefined, undefined)).toBe(true);
  });

  test("undefined and null not equal", () => {
    expect(equal(null, undefined)).toBe(false);
  });

  test("0 and null not equal", () => {
    expect(equal(null, 0)).toBe(false);
  });

  test("0 and undefined not equal", () => {
    expect(equal(undefined, 0)).toBe(false);
  });

  describe("object", () => {
    test("shallow", () => {
      let a = { firstLevel: "value" };
      let b = a;
      expect(equal(a, b)).toBe(true);
    });

    test("empty", () => {
      expect(equal({}, {})).toBe(true);
    });

    test("undefined vs missing value", () => {
      let a = { u: undefined };
      let b = {};
      expect(equal(a, b)).toBe(false);
    });

    test("missing vs undefined value", () => {
      const a = {};
      const b = { u: undefined };
      expect(equal(a, b)).toBe(false);
    });

    test("null vs missing value", () => {
      let a = { u: null };
      let b = {};
      expect(equal(a, b)).toBe(false);
    });

    test("deep", () => {
      let a = {
        u: undefined,
        n: -1,
        s: "s",
        a: [[0], [-1]],
        o: {
          q: ["", ""],
        },
      };
      // changed order of fields
      let b = {
        u: undefined,
        n: -1,
        a: [[0], [-1]],
        s: "s",
        o: {
          q: ["", ""],
        },
      };
      expect(equal(a, b)).toBe(true);
    });
  });

  describe("array", () => {
    test("array, shallow", () => {
      let a = [1, 2, 3];
      let b = a;
      expect(equal(a, b)).toBe(true);
    });

    test("array, empty", () => {
      expect(equal([], [])).toBe(true);
    });

    test("array, nested, deep", () => {
      let a = [null, undefined, "", "s", 0, -1, [[1], [2]], { q: { w: 1 } }];
      let b = [null, undefined, "", "s", 0, -1, [[1], [2]], { q: { w: 1 } }];
      expect(equal(a, b)).toBe(true);
    });
  });
});
