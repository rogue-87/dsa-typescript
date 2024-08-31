class Node<T> {
  data: T;
  next: Node<T> | null = null;

  constructor(data: T, next?: Node<T> | null) {
    this.data = data;
    if (next) this.next = next;
  }
}

export class Queue {}
