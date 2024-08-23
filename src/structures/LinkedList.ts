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
  private size: number = 0;

  append(data: T): void {
    const newNode = new Node(data);
    this.size++;
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
    this.size++;
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
    if (!Number.isInteger(index) || index < 0) throw new Error("Index must be a non-negative integer.");

    const newNode = new Node<T>(data);
    this.size++;

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

  remove(index: number): T {
    if (!(Number.isInteger(index) && index >= 0 && index < this.size)) throw new Error("Index is out of bounds");
    if (this.head === null && this.tail === null) throw new Error("There are no elements to remove");

    this.size--;
    if (index === 0) {
      // in case there's only one element in the list.
      if (this.head && this.head.next === null) {
        let temp = this.head.data;
        this.head = null;
        this.tail = null;
        return temp;
      }
      // in case there's more than one element in the list.
      if (this.head && this.head.next) {
        let temp = this.head;
        this.head = this.head.next;
        temp.next = null;
        this.head.prev = null;
        return temp.data;
      }
    }

    let leader = this.head;
    let count = 0;
    while (leader && count < index) {
      leader = leader.next;
      count++;
    }

    // Remove the node (current)
    if (leader) {
      const temp = leader.data;

      // Update the previous node's next pointer
      if (leader.prev) leader.prev.next = leader.next;

      // Update the next node's previous pointer
      if (leader.next) leader.next.prev = leader.prev;

      // If it's the tail, update the tail pointer
      if (leader === this.tail) this.tail = leader.prev;

      // Clear the removed node's pointers
      leader.next = null;
      leader.prev = null;

      return temp;
    }
    throw new Error("Index is out of bounds");
  }

  forEach(callback: (data: T) => void): void {
    let currentPtr = this.head;
    while (currentPtr) {
      callback(currentPtr.data);
      currentPtr = currentPtr.next;
    }
  }

  getSize() {
    return this.size;
  }
  constructor();
  constructor(node: Node<T>);

  constructor(node?: Node<T>) {
    if (node) {
      this.head = node;
      this.tail = node;
      this.size++;
    }
  }
}
