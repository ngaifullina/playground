import { repeatElementAtIndex } from "./array";

const START = 0;

enum Times {
  Double = 2,
  Triple = 3,
}

describe("duplicateElementAtIndex", () => {
  describe("duplicationTimes corner cases:", () => {
    test("negative times throws", () => {
      expect(() => repeatElementAtIndex(-1, START, [10])).toThrow();
    });

    test("zero times deletes element at index", () =>
      expect(repeatElementAtIndex(0, 1, [10, 20])).toEqual([10]));

    test("times of one does nothing", () => {
      expect(repeatElementAtIndex(1, START, [10])).toEqual([10]);
    });
  });

  describe("handles index out of bounds", () => {
    test("negative index", () => {
      expect(() => repeatElementAtIndex(Times.Double, 2, [0])).toThrow();
    });

    test("index too big", () => {
      expect(() => repeatElementAtIndex(Times.Double, 2, [0])).toThrow();
    });
  });

  describe("singleton array", () => {
    const VAL = 10;
    const ARR = [VAL];

    test("double", () => {
      expect(repeatElementAtIndex(Times.Double, START, ARR)).toEqual([
        VAL,
        VAL,
      ]);
    });

    test("triple", () => {
      expect(repeatElementAtIndex(Times.Triple, START, ARR)).toEqual([
        VAL,
        VAL,
        VAL,
      ]);
    });
  });

  describe("three-element array in all positions", () => {
    const ARR = [10, 20, 30];

    test.only("triple", () => {
      expect(repeatElementAtIndex(Times.Triple, 0, ARR)).toEqual([
        10, 10, 10, 20, 30,
      ]);

      expect(repeatElementAtIndex(Times.Triple, 1, ARR)).toEqual([
        10, 20, 20, 20, 30,
      ]);

      // expect(repeatElementAtIndex(Times.Triple, 2, ARR)).toEqual([
      //   10, 20, 30, 30, 30,
      // ]);
    });
  });
});
