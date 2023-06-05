import { List } from "./list";

describe("peek", () => {
  const emptyList = new List();

  test("returns null if head is empty", () => {
    expect(emptyList.peek()).toBe(undefined);
  });

  test("returns last element", () => {
    emptyList.push(11);
    emptyList.push(12);
    expect(emptyList.peek()).toBe(12);
  });
});

describe("peekFront", () => {
  const emptyList = new List();

  test("returns null if head is empty", () => {
    expect(emptyList.peekFront()).toBe(undefined);
  });

  test("returns first element", () => {
    emptyList.push(11);
    emptyList.push(12);
    expect(emptyList.peekFront()).toBe(11);
  });
});

describe("push", () => {
  test("follows LIFO semantic", () => {
    const emptyList = new List();

    emptyList.push(11);
    emptyList.push(12);
    emptyList.push(13);
    expect(emptyList.size()).toBe(3);
    expect(emptyList.peek()).toBe(13);
  });
});

describe("pop", () => {
  test("empty returns undefined on pop", () => {
    const emptyList = new List();

    expect(emptyList.pop()).toBe(undefined);
  });

  test("pop returns and removes last pushed value", () => {
    const emptyList = new List();

    emptyList.push(0);
    emptyList.push(3);

    expect(emptyList.pop()).toBe(3);
    expect(emptyList.size()).toBe(1);
  });
});

describe("unshift", () => {
  const emptyList = new List();

  test("insert at the beginning", () => {
    emptyList.push(11);
    emptyList.unshift(10);
    expect(emptyList.size()).toBe(2);
    expect(emptyList.peekFront()).toBe(10);
  });
});

describe("shift", () => {
  const emptyList = new List();

  test("returns error if nothiing to shift", () => {
    expect(() => emptyList.shift()).toThrowError();
  });

  test("shift decrements size", () => {
    emptyList.push(11);
    expect(emptyList.shift()).toBe(11);
    expect(emptyList.size()).toBe(0);
  });

  test("deletes from the beginning", () => {
    emptyList.push(11);
    emptyList.push(1);
    emptyList.shift();
    expect(emptyList.peekFront()).toBe(1);
  });
});

describe("set", () => {
  test("returns error if index is out of range", () => {
    const emptyList = new List();

    emptyList.push(11);
    emptyList.push(12);
    expect(() => emptyList.set(2, "kkk")).toThrowError();
  });

  test("value at correct index, deletes previous data", () => {
    const emptyList = new List();

    emptyList.push(11);
    emptyList.push(12);
    emptyList.set(1, 70);
    expect(emptyList.peek()).toBe(70);
    expect(emptyList.peekFront()).toBe(11);
    expect(emptyList.size()).toBe(2);
  });
});

describe("insert", () => {
  test("at the beginning", () => {
    const emptyList = new List();
    emptyList.push(11);
    emptyList.push(12);
    emptyList.insert(0, 10);
    expect(emptyList.peekFront()).toBe(10);
    expect(emptyList.size()).toBe(3);
  });

  test("at the end", () => {
    const emptyList = new List();
    emptyList.push(12);
    emptyList.push(13);
    emptyList.insert(2, 14);
    expect(emptyList.size()).toBe(3);
    expect(emptyList.peek()).toBe(14);
  });

  test("in the middle", () => {
    const emptyList = new List();
    emptyList.push(1);
    emptyList.push(2);
    emptyList.push(3);
    emptyList.push(4);
    emptyList.insert(2, 30);

    expect(emptyList.size()).toBe(5);
  });
});

describe("delete", () => {
  test("returns error if index not found", () => {
    const emptyList = new List();
    expect(() => emptyList.delete(2)).toThrowError();
  });

  test("delete first element", () => {
    const emptyList = new List();
    emptyList.push(3);
    expect(emptyList.delete(0)).toBe(3);
    expect(emptyList.size()).toBe(0);
  });

  test("delete last element", () => {
    const emptyList = new List();
    emptyList.push(3);
    emptyList.push(4);
    emptyList.push(5);
    expect(emptyList.delete(2)).toBe(5);
    expect(emptyList.peek()).toBe(4);
    expect(emptyList.size()).toBe(2);
  });

  test("delete element in the middle", () => {
    const emptyList = new List();
    emptyList.push(3);
    emptyList.push(4);
    emptyList.push(5);
    emptyList.push(6);
    emptyList.push(7);
    expect(emptyList.delete(2)).toBe(5);
    expect(emptyList.size()).toBe(4);
    expect(emptyList.shift()).toBe(3);
    expect(emptyList.shift()).toBe(4);
    expect(emptyList.shift()).toBe(6);
    expect(emptyList.shift()).toBe(7);
  });
});
