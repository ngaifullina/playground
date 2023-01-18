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
    expect(clone(a)).toEqual(a);
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
    const cloneA = clone(a);
    expect(cloneA).toEqual(a);
    cloneA.o.q = ["123", ""];
    expect(cloneA).not.toEqual(a);
    // expect(a.o).not.toBe(cloneA.o);
  });

  test("array, integers", () => {
    const a = [1, 2, 3, 4, 5];
    expect(clone(a)).toEqual(a);
  });
  test("array, all types", () => {
    let a = [null, undefined, "", "s", 0, -1, [[1], [2]], { q: { w: 1 } }];
    expect(clone(a)).toEqual(a);
  });
});
