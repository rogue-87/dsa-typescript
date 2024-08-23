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
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;

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

  insert(data: T, index: number, placement?: "before" | "after"): void {
    if (!Number.isInteger(index) || index < 0) {
      throw new Error("Index must be a non-negative integer.");
    }

    const newNode = new Node<T>(data);

    if (index === 0) {
      if (this.head) {
        switch (placement) {
          case "before":
            this.prepend(data);
            break;
          case "after":
            if (this.head.next) {
              newNode.next = this.head.next;
              this.head.next.prev = newNode;
              this.head.next = newNode;
              newNode.prev = this.head;
            } else this.append(data);
            break;
          default:
            this.prepend(data);
            break;
        }
      } else {
        this.head = newNode;
        this.tail = newNode;
      }
    } else {
      let leader: Node<T> | null = this.head;
      let count = 0;
      while (leader) {
        if (count === index) {
          switch (placement) {
            case "before":
              newNode.next = leader;
              newNode.prev = leader.prev;
              leader.prev!.next = newNode;
              leader.prev = newNode;
              break;
            case "after":
              if (leader === this.tail) {
                this.append(data);
              } else {
                newNode.prev = leader;
                newNode.next = leader.next;
                leader.next!.prev = newNode;
                leader.next = newNode;
              }
              break;
            default:
              newNode.next = leader;
              newNode.prev = leader.prev;
              leader.prev!.next = newNode;
              leader.prev = newNode;
              break;
          }
          return;
        } else {
          count++;
          leader = leader.next;
        }
      }
      if (index >= count) {
        this.append(data);
      }
    }
  }

  forEach(callback: (data: T) => void): void {
    let currentPtr = this.head;
    while (currentPtr) {
      callback(currentPtr.data);
      currentPtr = currentPtr.next;
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
