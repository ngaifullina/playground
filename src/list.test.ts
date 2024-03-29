import { List } from "./list";

describe("toArray", () => {
  test("returns [] on empty list if head is empty", () => {
    expect(new List().toArray()).toEqual([]);
  });

  test("returns array with list elements", () => {
    expect(new List(11, 12).toArray()).toEqual([11, 12]);
  });
});

describe("peek", () => {
  test("returns undefined if head is empty", () => {
    expect(new List().peek()).toBe(undefined);
  });

  test("returns last element without modifying list", () => {
    const items = [11, 12];
    const l = new List(...items);
    expect(l.peek()).toBe(12);
    expect(l.toArray()).toEqual(items);
  });
});

describe("peekFront", () => {
  test("returns undefined if head is empty", () => {
    expect(new List().peekFront()).toBe(undefined);
  });

  test("returns first element", () => {
    const items = [11, 12];
    const l = new List(...items);
    expect(l.peekFront()).toBe(11);
    expect(l.toArray()).toEqual(items);
  });
});

describe("push", () => {
  test("adds element to the end of the list", () => {
    const l = new List();

    l.push(11);
    l.push(12);
    l.push(13);
    expect(l.size()).toBe(3);
    expect(l.toArray()).toEqual([11, 12, 13]);
  });
});

describe("pop", () => {
  test("returns undefined on empty list", () => {
    const l = new List();

    expect(l.pop()).toBe(undefined);
  });

  test("returns and removes last value", () => {
    const l = new List(10, 11, 12);

    expect(l.pop()).toBe(12);
    expect(l.toArray()).toEqual([10, 11]);
    expect(l.size()).toBe(2);
  });
});

describe("unshift", () => {
  test("inserts one item at list head", () => {
    const l = new List();

    l.unshift(13);
    expect(l.size()).toBe(1);
    expect(l.toArray()).toEqual([13]);
  });

  test("inserts item at list head", () => {
    const l = new List(11, 12);

    l.unshift(13);
    expect(l.size()).toBe(3);
    expect(l.toArray()).toEqual([13, 11, 12]);
  });
});

describe("get", () => {
  const l = new List(11, 12, 14, 15, 16);

  test("negative index", () => {
    expect(l.get(-1)).toBe(16);
    expect(l.get(-2)).toBe(15);
    expect(l.get(-3)).toBe(14);
    expect(l.get(-4)).toBe(12);
    expect(l.get(-5)).toBe(11);
  });

  test("positive index", () => {
    expect(l.get(0)).toBe(11);
    expect(l.get(1)).toBe(12);
    expect(l.get(2)).toBe(14);
    expect(l.get(3)).toBe(15);
    expect(l.get(4)).toBe(16);
  });

  test("index out of range", () => {
    expect(l.get(6)).toBe(undefined);
    expect(l.get(-6)).toBe(undefined);
  });
});

describe("shift", () => {
  test("returns undefined if nothiing to shift", () => {
    expect(new List().shift()).toBe(undefined);
  });

  test("shift decrements size", () => {
    const l = new List();

    l.push(11);
    expect(l.shift()).toBe(11);
    expect(l.isEmpty()).toBe(true);
  });

  test("deletes from the beginning", () => {
    const l = new List(11, 1);
    l.shift();
    expect(l.peekFront()).toBe(1);
    expect(l.size()).toBe(1);
  });
});

describe("set", () => {
  test("at negative index throws", () => {
    const l = new List(11);
    expect(() => l.set(-2, 70)).toThrowError();
  });

  test("at index 0 overwrites the head", () => {
    const l = new List(11);
    l.set(0, 70);
    expect(l.toArray()).toEqual([70]);
    expect(l.size()).toBe(1);
  });

  test("at index equal to list (length-1) overwrites the end", () => {
    const l = new List(11, 12, 13);
    l.set(2, 70);
    expect(l.toArray()).toEqual([11, 12, 70]);
    expect(l.size()).toBe(3);
  });

  test("if index equals to list (length) throws error", () => {
    const l = new List(11, 12, 13);
    expect(() => l.set(3, 40)).toThrowError();
  });

  test("if index is out of range", () => {
    const l = new List(11, 12);
    expect(() => l.set(2, 222)).toThrowError();
  });

  test("at index between 0 and list length overwrites item in the middle", () => {
    const l = new List(11, 12, 13, 15);

    l.set(2, 70);
    expect(l.toArray()).toEqual([11, 12, 70, 15]);
    expect(l.size()).toBe(4);
  });
});

describe("insert", () => {
  test("at negative index > length throws", () => {
    const l = new List(11, 13, 2);
    expect(() => l.insert(-5, 70)).toThrowError();
  });
  test("at the head when index 0", () => {
    const l = new List(11, 12);
    l.insert(0, 10);
    expect(l.toArray()).toEqual([10, 11, 12]);
    expect(l.size()).toBe(3);
  });

  test("at the end when index equal to list length", () => {
    const l = new List(11, 12, 13);
    l.insert(3, 14);
    expect(l.toArray()).toEqual([11, 12, 13, 14]);
    expect(l.size()).toBe(4);
  });

  test("if index is out of range throws error", () => {
    const l = new List(11, 12);
    expect(() => l.set(2, 222)).toThrowError();
  });

  test("in the middle when index is between 0 and list length ", () => {
    const l = new List(11, 12, 13, 14);
    l.insert(2, 30);
    expect(l.toArray()).toEqual([11, 12, 30, 13, 14]);
    expect(l.size()).toBe(5);
  });
});

describe("delete", () => {
  test("does nothing on empty list", () => {
    expect(new List().delete(0)).toBe(undefined);
    expect(new List().delete(1)).toBe(undefined);
  });

  test("returns undefined if index out of bounds", () => {
    expect(new List(1, 2, 3).delete(3)).toBe(undefined);
    expect(new List(1, 2, 3).delete(-1)).toBe(undefined);
  });

  test("delete first element", () => {
    const l = new List(3);

    l.delete(0);
    expect(l.isEmpty()).toBe(true);
  });

  test("delete last element", () => {
    const l = new List(3, 4, 5);

    l.delete(2);
    expect(l.toArray()).toEqual([3, 4]);
    expect(l.size()).toBe(2);
  });

  test("delete element in the middle", () => {
    const l = new List(3, 4, 5, 6, 7);
    l.delete(2);
    expect(l.toArray()).toEqual([3, 4, 6, 7]);
    expect(l.size()).toBe(4);
  });
});
