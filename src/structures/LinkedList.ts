class Node<T> {
  data: T;
  next: Node<T> | null = null;
  prev: Node<T> | null = null;

  constructor(data: T, next?: Node<T> | null, prev?: Node<T> | null) {
    this.data = data;
    if (next) this.next = next;
    if (prev) this.prev = prev;
  }
}

export default class LinkedList<T> {
  head: Node<T> | null = null;
  tail: Node<T> | null = null;

  append(data: T): void {
    const newNode = new Node(data);
    if (this.tail) {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    } else {
      this.head = newNode;
      this.tail = newNode;
    }
  }

  prepend(data: T): void {
    const newNode = new Node(data);
    if (this.head) {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    } else {
      this.head = newNode;
      this.tail = newNode;
    }
  }



  constructor();
  constructor(node: Node<T>);

  constructor(node?: Node<T>) {
    if (node) {
      this.head = node;
      this.tail = node;
    }
  }
}
