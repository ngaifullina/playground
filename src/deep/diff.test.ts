import { diff } from "./diff";

describe("Difference beetween two objects", () => {
  test("returns empty object if two fields are null", () => {
    const a = { n: null };
    const b = { n: null };
    expect(diff(a, b)).toEqual({});
  });

  test("returns empty object if two fields are undefined", () => {
    const a = { u: undefined };
    const b = { u: undefined };

    expect(diff(a, b)).toEqual({});
  });

  test("returns object with missing field with undefined inside", () => {
    const a = { u: undefined };
    const b = {};

    expect(diff(a, b)).toEqual({ u: undefined });
  });

  test("returns object with missing field", () => {
    const a = { first: "first", second: "second" };
    const b = { second: "second" };

    expect(diff(a, b)).toEqual({ first: "first" });
  });

  test("returns field that differs", () => {
    const a = { first: "first", second: "second" };
    const b = { first: "not first", second: "second" };

    expect(diff(a, b)).toEqual({ first: "first" });
  });

  test("returns field that differs in nested object", () => {
    const a = { quality: { salt: "maybe" }, amount: 28 };
    const b = { quality: { salt: "not" }, amount: 28 };

    expect(diff(a, b)).toEqual({ quality: { salt: "maybe" } });
  });
});

describe("Difference beetween two arrays", () => {
  test("returns missing items of array in object", () => {
    const a = { arr: [0, 3, 4] };
    const b = { arr: [0] };

    expect(diff(a, b)).toEqual({ arr: [3, 4] });
  });

  test("returns missing items of array", () => {
    const a = [0, 3, 4];
    const b = [0];

    expect(diff(a, b)).toEqual([3, 4]);
  });

  test("returns missing arrays of array", () => {
    const a = [[0], [-1]];
    const b = [[-1]];

    expect(diff(a, b)).toEqual([[0]]);
  });

  test("in objects", () => {
    const a = {
      // c: undefined,
      // o: -1,
      m: "s",
      // a: [[0], [-1]],
      // n: {
      //   q: ["0", "1"],
      // },
      d: "different",
    };

    const b = {
      // c: undefined,
      // o: 0, // different int
      m: "s",
      // a: [[-1]], // only 1-st of array
      // n: {
      //   q: ["1", "2"],
      // },
      i: "another",
    };

    const c = {
      // o: -1,
      // a: [[0]],
      // n: {
      //   q: ["0"],
      // },
      d: "different",
    };

    expect(diff(a, b)).toEqual(c);
  });
});
