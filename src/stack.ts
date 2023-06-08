import { List } from "./list";

export type Stack<T> = {
  push(t: T): void;
  pop(): T | undefined;
};

export class StackArray<T> implements Stack<T> {
  array: T[];
  constructor() {
    this.array = [];
  }

  push(t: T): void {
    this.array.push(t);
  }

  pop(): T | undefined {
    if (!this.array.length) return undefined;

    return this.array.pop();
  }
}

export class StackList<T> implements Stack<T> {
  list: List<T>;
  constructor() {
    this.list = new List();
  }

  push(t: T): void {
    this.list.push(t);
  }

  pop(): T | undefined {
    return this.list.pop();
  }
}
