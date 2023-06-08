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

  public push(data: T): number {
    this.insert(this.length, data);
    return this.length;
  }

  public unshift(data: T): number {
    this.insert(0, data);
    return this.length;
  }

  public shift(): T | undefined {
    return this.delete(0);
  }

  public pop(): T | undefined {
    return this.delete(this.length - 1);
  }

  public size(): number {
    return this.length;
  }

  private getItem(index: number): Item<T> | undefined {
    if (Math.abs(index) > this.length) {
      return undefined;
    }

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
    const itemAtIndex = this.getItem(index);
    if (!itemAtIndex) {
      throw new Error(`Failed to set: ${index} is out of range`);
    }

    this.getItem(index)!.data = value;
    return itemAtIndex.data;
  }

  public insert(index: number, value: T): void {
    if (Math.abs(index) > this.length) {
      throw new Error(`Failed to set: ${index} is out of bounds`);
    }
    if (index === 0) {
      const node = new Item(value, this.head);
      this.head = node;
    } else {
      const item = this.getItem(index - 1);
      const node = new Item(value, item?.next);
      item!.next = node;
    }
    this.length++;
  }

  public peekFront(): T | undefined {
    if (!this.head) return undefined;
    return this.head.data;
  }

  public peek(): T | undefined {
    const last = this.getItem(this.length - 1);
    if (!last) return undefined;
    return last.data;
  }

  public delete(index: number): T | undefined {
    if (index >= this.length || index < 0 || !this.head) return undefined;
    let item: T | undefined = undefined;

    if (index === 0) {
      item = this.head.data;
      this.head = this.head?.next;
    } else {
      const start = this.getItem(index - 1);
      item = start?.next?.data;
      start!.next = start?.next?.next!;
    }

    this.length--;
    return item;
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
}
