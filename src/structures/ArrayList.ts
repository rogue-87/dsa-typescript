export default class ArrayList<T> {
  /**
   * @description ArrayList data entries
   */
  private data: T[];
  /**
   * @description ArrayList capacity
   */
  public size: number;

  private isWithinBounds(index: number): boolean {
    return Number.isInteger(index) && index >= 0 && index <= this.data.length - 1;
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
    else if (this.isWithinBounds(index)) {
      // I love slicing. Easier than for loops shenanigans.
      // oh, higher space complexity, but at least it's faster, right?
      this.data = [...this.data.slice(0, index), value, ...this.data.slice(index)];
    } else {
      throw new Error("Index is out of bounds");
    }
  }

  remove(): T;
  remove(index: number): T;

  public remove(index?: number): T {
    // No index
    if (typeof index === "undefined") {
      return this.data.pop() as T;
    }
    // Index
    else if (this.isWithinBounds(index)) {
      if (index === 0) {
        const value = this.data[index];
        this.data = [...this.data.slice(1)];
        return value;
      }
      //
      else if (index === this.data.length - 1) {
        return this.data.pop() as T;
      }
      //
      else {
        const value = this.data[index];
        this.data = [...this.data.slice(0, index), ...this.data.slice(index + 1)];
        return value;
      }
    }
    throw new Error("Index is out of bounds");
  }

  public clear(): void {
    this.data = [];
    this.size = this.data.length;
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

  public getData(): T[] {
    return this.data;
  }

  public isEmpty(): boolean {
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

  // I'll do algorithms later. btw, the algorithm used by the Array sort function
  // in js is known as timesort which is derived from mergesort & insertion sort.
  // It's also used in other programming languages such as python and rust.
  // guess it's very reliable and stable.
  // more info: 'https://en.wikipedia.org/wiki/Timsort'
  public sort(compareFn?: ((a: T, b: T) => number) | undefined): void {
    this.data.sort(compareFn);
  }

  constructor();
  constructor(data?: T[]);

  constructor(data?: T[]) {
    if (Array.isArray(data)) {
      this.data = data;
      this.size = this.data.length;
    } else {
      this.data = [];
      this.size = 0;
    }
  }
}

export function stressTest() {
  const arrayList = new ArrayList<number>([2, 5, 1, 8, 5, 9, 3, 1]);
  console.log(arrayList.getData());
  arrayList.sort((a, b) => a - b);
  console.log(arrayList.getData());

  console.log(arrayList.get(3));
  arrayList.set(3, 4);
  console.log(arrayList.get(3));
}
