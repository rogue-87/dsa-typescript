class Node<T> {
  data: T;
  next: Node<T> | null = null;

  constructor(data: T, next?: Node<T> | null) {
    this.data = data;
    if (next) this.next = next;
  }
}

export class Stack<T> {
  private top: Node<T> | null = null;
  private size: number = 0;

  constructor();
  constructor(data: Node<T>);

  constructor(data?: T) {
    if (data) {
      this.top = new Node(data);
      this.size++;
    }
  }

  push(data: T): void {
    this.size++;

    // If the list is empty
    if (!this.top) {
      this.top = new Node<T>(data);
      return;
    }

    // If the list has elements in it.
    if (this.top) {
      let newNode = new Node<T>(data);
      newNode.next = this.top;
      this.top = newNode;
    }
  }

  pop(): T {
    if (!this.top) throw new Error("The list is empty");

    this.size--;
    let ptr: Node<T> | null = this.top;
    this.top = this.top.next;
    ptr.next = null;
    return ptr.data;
  }

  peek(): T {
    if (!this.top) throw new Error("The list is empty");
    return this.top.data;
  }

  isEmpty(): boolean {
    return this.top === null;
  }

  getSize(): number {
    return this.size;
  }

  clear(): void {
    if (!this.top) throw new Error("The Stack is empty");
    this.top.next = null;
    this.top = null;
  }

  forEach(callback: (data: T) => void): void {
    let leader = this.top;
    while (leader !== null) {
      callback(leader.data);
      leader = leader.next;
    }
  }
}
