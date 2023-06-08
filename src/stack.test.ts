import { Stack, StackArray, StackList } from "./stack";

function testStack(emptyStack: Stack<number>): void {
  describe("stack", () => {
    test("empty returns undefined on pop", () => {
      expect(emptyStack.pop()).toBe(undefined);
    });

    test("pop returns and removes last pushed value", () => {
      emptyStack.push(0);
      expect(emptyStack.pop()).toBe(0);
      expect(emptyStack.pop()).toBe(undefined);
    });

    test.only("follows LIFO semantic", () => {
      emptyStack.push(1);
      emptyStack.push(2);
      emptyStack.push(3);

      expect(emptyStack.pop()).toBe(3);
      expect(emptyStack.pop()).toBe(2);
      expect(emptyStack.pop()).toBe(1);
      expect(emptyStack.pop()).toBe(undefined);
    });
  });
}

// testStack(new StackArray<number>());
testStack(new StackList<number>());
