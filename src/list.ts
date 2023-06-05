class Item<T> {
  constructor(public data: T, public next: Item<T> | null = null) {}
}

export class List<T> {
  private head: Item<T> | null;
  private length: number = 0;

  constructor() {
    this.head = null;
  }

  private last(): Item<T> | null {
    let current = this.head;
    if (!current) return null;

    while (current.next) {
      current = current.next;
    }

    return current;
  }

  public push(data: T): number {
    const node = new Item(data);

    if (!this.head) {
      this.head = node;
    } else {
      this.last()!.next = node;
    }

    this.length++;
    return this.length;
  }

  public unshift(data: T): number {
    const node = new Item(data, this.head);
    this.head = node;
    this.length++;
    return this.length;
  }

  public shift(): T {
    if (!this.head) {
      throw new Error("Failed to shift: head does not exist, nothing to shift");
    }
    const head = this.head;
    this.head = this.head?.next;
    this.length--;

    return head.data;
  }

  public pop(): T | undefined {
    if (!this.head) {
      return undefined;
    } else if (this.head?.next === null) {
      const item = this.head!.data;
      this.head = null;
      this.length--;
      return item;
    } else {
      let current = this.head;

      while (current.next?.next) {
        current = current?.next;
      }

      const item = current.next?.data;
      current.next = null;
      this.length--;
      return item;
    }
  }

  public size() {
    return this.length;
  }

  private getItem(index: number) {
    let i = 0;
    let current = this.head;

    while (i < index) {
      if (!current) return null;
      current = current.next;
      i++;
    }
    return current;
  }

  public set(index: number, value?: T, next?: Item<T> | null): T | null {
    //todo at least one of them
    const itemAtIndex = this.getItem(index);
    if (!this.getItem(index) || !itemAtIndex) {
      throw new Error(`Failed to set: ${index} is out of range`);
    }
    if (value) this.getItem(index)!.data = value;
    if (next) this.getItem(index)!.next = next;
    return itemAtIndex.data;
  }

  public insert(index: number, value: T): void {
    const end = this.getItem(index);
    if (!this.getItem(index) || !end || index === this.size() - 1) {
      this.push(value);
    } else if (index === 0) {
      this.unshift(value);
    } else {
      const node = new Item(value, end);
      const start = this.getItem(index - 1);
      start!.next = node;
      this.length++;
    }
  }

  public peekFront(): T | undefined {
    if (!this.head) return undefined;
    return this.head.data;
  }

  public peek(): T | undefined {
    if (!this.last()) return undefined;
    return this.last()!.data;
  }

  public delete(index: number): T | undefined {
    if (index === 0) {
      return this.shift(); //todo why return
    } else if (index === this.length - 1) {
      return this.pop();
    } else {
      const pointerTodelete = this.getItem(index - 1)?.next;
      console.log(pointerTodelete, "pointerTodelete");
      if (!pointerTodelete) {
        throw new Error(`Failed to delete: index ${index} not found`);
      }
      this.set(index - 1, undefined, pointerTodelete.next);
      this.length--;
      this.forEachFn((item) => console.log(item));
      return pointerTodelete.data;
    }
  }

  public forEachFn(fn: (current: T) => void): void {
    let current = this.head;

    while (current) {
      fn(current.data);
      current = current.next;
    }
  }

  // append(list2)

  // prepend(list2)

  // map

  // filter

  // reduce

  // forEach
}
