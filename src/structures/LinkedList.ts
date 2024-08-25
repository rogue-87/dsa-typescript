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

  insert(data: T, index: number, placement: "before" | "after" = "before"): void {
    if (!(Number.isInteger(index) && index >= 0 && index <= this.size)) {
      throw new Error("Index must be a non-negative integer within bounds.");
    }

    const newNode = new Node(data);

    // insert at the head
    if (index === 0) {
      // insert after the head
      if (this.head && placement === "after" && this.head.next) {
        this.size++;
        newNode.next = this.head.next;
        this.head.next.prev = newNode;
        this.head.next = newNode;
        newNode.prev = this.head;
      }
      // insert before the head(same as the prepend function)
      else {
        this.prepend(data);
      }
      return;
    }

    // insert after the tail(same as the append function)
    if (index === this.size - 1 && placement === "after") {
      this.append(data);
      return;
    }

    // figure out the index
    let leader = this.head;
    let count = 0;
    while (leader && count < index) {
      leader = leader.next;
      count++;
    }

    // if leader is alive :p
    if (leader) {
      if (placement === "before") {
        this.size++;
        newNode.next = leader;
        newNode.prev = leader.prev;
        if (leader.prev) leader.prev.next = newNode;
        leader.prev = newNode;
        if (index === 0) this.head = newNode;
      } else {
        this.size++;
        newNode.prev = leader;
        newNode.next = leader.next;
        if (leader.next) leader.next.prev = newNode;
        leader.next = newNode;
        if (index === this.size - 1) this.tail = newNode;
      }
    } else {
      throw new Error("Index out of bounds");
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

  get(index: number): T {
    if (!isWithinBounds(index, this.size)) throw new Error("Index is out of bounds");
    if (!this.head) throw new Error("The list is empty");
    let leader = this.head;
    let count = 0;
    for (let i = 0; i < this.size; i++) {
      if (count === index) return leader.data;

      if (leader.next) leader = leader.next;
      count++;
    }
    throw new Error("Index is out of bounds");
  }

  getSize() {
    return this.size;
  }

  indexOf(value: T): number | undefined {
    if (!this.head) throw new Error("The list is empty");
    let leader = this.head;
    let count = 0;
    for (let i = 0; i < this.size; i++) {
      if (leader.data === value) return count;

      if (leader.next) leader = leader.next;
      count++;
    }
    console.error(`The element: ${value} is not in the linked list.`);
    return undefined;
  }

  contains(value: T): boolean {
    if (!this.head) throw new Error("The list is empty");
    let leader = this.head;
    let count = 0;
    for (let i = 0; i < this.size; i++) {
      if (leader.data === value) return true;

      if (leader.next) leader = leader.next;
      count++;
    }
    return false;
  }

  isEmpty(): boolean {
    if (this.size === 0 && this.head === null) return true;
    return false;
  }

  clear(): void {
    this.head = null;
    this.tail = null;
  }

  toArray(): T[] {
    if (!this.head) return [];
    let leader = this.head;
    const array = new Array<T>();
    for (let i = 0; i < this.size; i++) {
      array.push(leader.data);
    }
    return array;
  }

  reverse(): void {
    let leader = this.head;
    let follower = null;

    while (leader !== null) {
      follower = leader.prev;
      leader.prev = leader.next;
      leader.next = follower;
      leader = leader.prev;
    }

    if (follower != null) {
      this.head = follower.prev;
    }
  }

  getHead(): Node<T> {
    if (!this.head) throw new Error("The list is empty");
    return this.head;
  }

  getTail(): Node<T> {
    if (!this.tail) throw new Error("The list is empty");
    return this.tail;
  }

  forEach(callback: (data: T) => void): void {
    let leader = this.head;
    while (leader) {
      callback(leader.data);
      leader = leader.next;
    }
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

import { getRandomInt, isWithinBounds } from "../utils.js";
import readline from "node:readline";
export function stressTest() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  const ls = new LinkedList<number>();
  const intensity = 1000000;

  console.time("appending");
  for (let i = 1; i <= intensity; i++) {
    ls.prepend(i);
  }
  console.timeEnd("appending");

  console.time("prepending");
  for (let i = 1; i <= intensity; i++) {
    ls.append(i);
  }
  console.timeEnd("prepending");

  console.time("inserting");
  for (let i = 1; i <= intensity; i++) {
    ls.insert(i, getRandomInt(1, 100) - 1, "after");
  }
  for (let i = 1; i <= intensity; i++) {
    ls.insert(i, getRandomInt(1, 100) - 1, "before");
  }
  for (let i = 1; i <= intensity; i++) {
    ls.insert(i, getRandomInt(1, 100) - 1);
  }
  console.timeEnd("inserting");

  console.log();

  console.log("============================== Structure ==============================");
  console.log(ls);
  console.log("=======================================================================");

  console.log();

  rl.question("Do you want to print out all entries? ('yes' | 'No'): ", (answer: "yes" | "no" | string) => {
    if (answer === "yes") {
      console.log("Printing out entries");
      console.log("=============================== Entries ===============================");
      ls.forEach((data) => {
        console.log(data);
      });
      console.log("=======================================================================");
    } else {
      console.log("aborting");
    }
    console.log("Test ended");
    rl.close();
  });
}
