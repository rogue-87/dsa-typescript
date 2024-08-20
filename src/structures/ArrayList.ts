export default class ArrayList<T> {
  /**
   * @description ArrayList data entries
   */
  private data: T[];
  /**
   * @description ArrayList capacity
   */
  public cap: number;

  private isWithinBounds(index: number) {
    return (
      Number.isInteger(index) && index >= 0 && index <= this.data.length - 1
    );
  }

  /**
   * @description adds an element to the end of the list.
   */
  add(value: T): void;
  /**
   * @description inserts an element to the list.
   */
  add(value: T, index?: number): void;

  public add(value: T, index?: number): void {
    // value only
    if (typeof index === "undefined") {
      this.data.length++;
      this.data[this.data.length - 1] = value;
    }
    // value & index
    // Validate index
    else if (!this.isWithinBounds(index)) {
      throw new Error("Index is out of bounds");
    }
    // I love slicing. Easier than for loops shenanigans.
    // oh, higher space complexity, but at least it's faster, right?
    this.data = [
      ...this.data.slice(0, index),
      value,
      ...this.data.slice(index),
    ];
  }

  remove(): T;
  remove(index: number): T;

  public remove(index?: number): T {
    // No index
    if (!index) {
      this.data.pop();
    }
    // Index
    else if (this.isWithinBounds(index)) {
      const value = this.data[index];
      this.data = [...this.data.slice(0, index), ...this.data.slice(index + 1)];
      return value;
    }
    throw new Error("Index is out of bounds");
  }

  public clear(): void {
    this.data = [];
    this.cap = this.data.length;
  }

  public get(index: number): T {
    if (this.isWithinBounds(index)) {
      return this.data[index];
    } else throw new Error(`${index} is out of bounds or not an integer`);
  }

  public set(index: number, value: T): void {
    if (this.isWithinBounds(index)) {
      this.data[index] = value;
    } else throw new Error(`${index} is out of bounds`);
  }

  public getData() {
    return this.data;
  }

  public isEmpty() {
    return this.data.length === 0;
  }

  public indexOf(value: T): number {
    for (let i = 0; i < this.data.length; i++) {
      if (value === this.data[i]) return i;
    }
    console.error("could not find element. returning -1");
    return -1;
  }

  public lastIndexOf(value: T): number {
    for (let i = this.data.length - 1; i >= 0; i--) {
      if (value === this.data[i]) return i;
    }
    console.error("could not find element. returning -1");
    return -1;
  }

  // public sort(comparator: Function): void {}

  constructor();
  constructor(arg1?: T[]);

  constructor(arg1?: T[]) {
    if (Array.isArray(arg1)) {
      this.data = arg1;
      this.cap = this.data.length;
    } else {
      this.data = [];
      this.cap = 0;
    }
  }
}
