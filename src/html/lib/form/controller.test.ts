import ControllerImpl from "./controller";

describe("Form Controller", () => {
  test("calculateRowOptionSets", () => {
    const actual = ControllerImpl.calculateRowOptionSets(
      ["name", "age", "job", "email"],
      ["age", "email"]
    );

    const expected: string[][] = [
      ["name", "age", "job"],
      ["name", "job", "email"],
    ];

    expect(actual).toEqual(expected);
  });
  test("1", () => {
    const a = ControllerImpl.calculateRowOptionSets(
      ["name", "job", "age"],
      ["name", "job"]
    );

    const e: string[][] = [
      ["name", "age"],
      ["job", "age"],
    ];

    expect(a).toEqual(e);
  });
});
