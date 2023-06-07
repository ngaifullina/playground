class Item<T> {
  constructor(public data: T, public next: Item<T> | null = null) {}
}

export class List<T> {
  private head: Item<T> | null;
  private length: number = 0;

  constructor(...items: T[]) {
    this.head = null;
    items.forEach((i) => this.push(i));
  }

  public last(): Item<T> | null {
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

  public shift(): T | undefined {
    if (!this.head) {
      return undefined;
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

  public size(): number {
    return this.length;
  }

  private getItem(index: number): Item<T> | undefined {
    let i = 0;
    let current = this.head;
    let itemToFind = this.head;

    if (index < 0) {
      for (i; i < Math.abs(index); i++) {
        if (!itemToFind) return undefined;
        itemToFind = itemToFind?.next;
      }

      while (itemToFind) {
        itemToFind = itemToFind.next;
        current = current?.next!;
      }
      return current!;
    } else {
      while (i < index) {
        if (!current) return undefined;
        current = current.next;
        i++;
      }
      return current!;
    }
  }

  public getItemData(index: number): T | undefined {
    return this.getItem(index)?.data;
  }

  /**
   * @throws {Error} if index out of bounds
   * @returns {T} old value
   */
  public set(index: number, value: T): T {
    if (index < 0 || index > this.length) {
      throw new Error(`Failed to set: ${index} is out of bounds`);
    }

    // todo better impl

    const itemAtIndex = this.getItem(index);
    if (!this.getItem(index) || !itemAtIndex) {
      throw new Error(`Failed to set: ${index} is out of range`);
    }

    if (value) this.getItem(index)!.data = value;
    return itemAtIndex.data;
  }

  public insert(index: number, value: T): void {
    if (index < 0 || index > this.length) {
      throw new Error(`Failed to set: ${index} is out of bounds`);
    }

    const itemToInsert = this.getItem(index);
    if (!itemToInsert || index === this.length - 1) {
      this.push(value);
    } else if (index === 0) {
      this.unshift(value);
    } else {
      const node = new Item(value, itemToInsert);
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
      // this.set(index - 1, undefined, pointerTodelete.next); //todo
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

  public toArray(): Array<T> {
    const arr: Array<T> = [];
    this.forEachFn((el) => arr.push(el));
    return arr;
  }

  // append(list2)

  // prepend(list2)

  // map

  // filter

  // reduce

  // forEach
}
// const a = new List(1, 2, 3);
const b = new List([4, 5, 6]);

// a.forEachFn((el) => console.log(el));
// b.forEachFn((el) => console.log(el));
