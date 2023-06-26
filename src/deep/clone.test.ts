import { clone } from "./clone";

describe("Clone primitives", () => {
  test("integer, negative", () => {
    expect(clone(-1)).toBe(-1);
  });

  test("string", () => {
    expect(clone("a")).toBe("a");
  });
  test("boolean", () => {
    expect(clone(false)).toBe(false);
  });
});

describe("Clone object", () => {
  test("{}", () => {
    const a = { name: "Masha", age: 29 };
    expect(clone(a)).toEqual({ name: "Masha", age: 29 });
  });

  test("deep", () => {
    const a = {
      u: undefined,
      n: -1,
      s: "s",
      a: [[0], [-1]],
      o: {
        q: ["", ""],
      },
    };
    const b = clone(a);
    expect(b).toEqual(a);
    b.o.q = ["123", ""];
    expect(b).not.toEqual(a);
    expect(a.o).not.toBe(b.o);
  });

  test("array, integers", () => {
    const a = [1, 2, 3, 4, 5];
    expect(clone(a)).toEqual([1, 2, 3, 4, 5]);
  });
  test("array, all types", () => {
    let a = [null, undefined, "", "s", 0, -1, [[1], [2]], { q: { w: 1 } }];
    expect(clone(a)).toEqual(a);
  });
});
