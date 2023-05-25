import { ControllerImpl } from "./controller";

class ControllerImplAccess extends ControllerImpl {
  public static _calculateRowOptionSets(
    allOptions: string[],
    selectedOptions: string[]
  ): string[][] {
    return ControllerImpl.calculateRowOptionSets(allOptions, selectedOptions);
  }
}

describe("Form Controller", () => {
  test("calculateRowOptionSets", () => {
    const actual = ControllerImplAccess._calculateRowOptionSets(
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
    const a = ControllerImplAccess._calculateRowOptionSets(
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
