import { diff } from "./diff";

describe("Diff a - b", () => {
  test("complicated objects", () => {
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

  test("a has smth that b doesn't", () => {
    const a = {
      first: "first",
      second: "second",
    };

    const b = {
      second: "second",
    };

    const c = {
      first: "first",
    };

    expect(diff(a, b)).toEqual(c);
  });

  test("numbers", () => {
    const a = {
      o: -1,
    };

    const b = {
      o: 0,
    };

    const c = {
      o: -1,
    };

    expect(diff(a, b)).toEqual(c);
  });

  test("a has smth that differs from b", () => {
    const a = {
      first: "first",
      second: "second",
    };

    const b = {
      first: "not first",
      second: "second",
    };

    const c = {
      first: "first",
    };

    expect(diff(a, b)).toEqual(c);
  });

  test("a has smt that differs from b deep", () => {
    const a = {
      quality: {
        salt: "maybe",
      },
      amount: 28,
    };

    const b = {
      quality: {
        salt: "not",
      },
      amount: 28,
    };

    const c = {
      quality: {
        salt: "maybe",
      },
    };
    expect(diff(a, b)).toEqual(c);
  });

  test("both a and b have same field with value of `undefined", () => {
    const a = { u: undefined };
    const b = { u: undefined };
    const c = {};
    expect(diff(a, b)).toEqual(c);
  });

  test("a has a field with value of `undefined`, b doesn't", () => {
    const a = { u: undefined };
    const b = {};
    const c = { u: undefined };
    expect(diff(a, b)).toEqual(c);
  });

  describe("nested objects; shallow vs deep equality ", () => {
    test("a has a field with a nested object, b empty", () => {
      const a = { o: {} };
      const b = {};
      const c = { o: {} };
      expect(diff(a, b)).toEqual(c);
    });

    test("both a and b have same field with a nested object", () => {
      const a = { o: {} };
      const b = { o: {} };
      const c = {};
      expect(diff(a, b)).toEqual(c);
    });
  });

  test("both a and b have same null field", () => {
    const a = { n: null };
    const b = { n: null };
    const c = {};
    expect(diff(a, b)).toEqual(c);
  });
});

describe("Array", () => {
  test("Object contains array", () => {
    const a = {
      a: [0, 3, 4],
    };

    const b = {
      a: [0], // only 1-st of array
    };

    const c = {
      a: [3, 4],
    };

    expect(diff(a, b)).toEqual(c);
  });

  test("simple array", () => {
    const a = [0, 3, 4];

    const b = [0];

    const c = [3, 4];

    expect(diff(a, b)).toEqual(c);
  });

  test("nested array", () => {
    const a = [[0], [-1]];

    const b = [[-1]];

    const c = [[0]];

    expect(diff(a, b)).toEqual(c);
  });

  test("nested array", () => {
    const a = [[3, 4, 5], [0, 2], [-1]];

    const b = [[0, 2], [-1]];

    const c = [[3, 4, 5]];

    expect(diff(a, b)).toEqual(c);
  });
});
