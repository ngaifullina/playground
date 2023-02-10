import ControllerImpl from "./controller";

describe("Form Controller", () =>
  test("calculateRowOptionSets", () => {
    const actual = ControllerImpl.calculateRowOptionSets(
      ["name", "age", "job", "email"],
      [{ option: "age" }, { option: "email" }]
    );

    const expected: string[][] = [
      ["name", "age", "job"],
      ["name", "job", "email"],
    ];

    expect(actual).toEqual(expected);
  }));
