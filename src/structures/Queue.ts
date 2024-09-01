class Node<T> {
  data: T;
  next: Node<T> | null = null;

  constructor(data: T) {
    this.data = data;
  }
}

export class Queue<T> {
  private front: Node<T> | null = null;
  private rear: Node<T> | null = null;
  private size: number = 0;

  enqueue(data: T): void {
    const newNode = new Node<T>(data);
    this.size++;
    // if there are elements in the queue
    if (this.rear) this.rear.next = newNode;
    // if there are none
    else this.front = newNode;

    this.rear = newNode;
  }

  dequeue(): T {
    // Checks if queue is empty
    if (!this.front) throw Error("Queue is empty");

    const data = this.front.data;
    this.front = this.front.next;
    if (!this.front) this.rear = null;
    this.size--;
    return data;
  }

  peek(): T {
    if (!this.front) throw new Error("Queue is empty");
    return this.front.data;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  getSize(): number {
    return this.size;
  }

  clear(): void {
    this.front = null;
    this.rear = null;
    this.size = 0;
  }
}

export function stressTest() {
  const line = new Queue<number>();
  for (let i = 0; i < 10; i++) {
    line.enqueue(i);
  }
  console.log(line);

  for (let i = 0; i < 10; i++) {
    console.log(line.dequeue());
  }

  if (!line.isEmpty()) line.peek();

  for (let i = 0; i < 100; i++) {
    line.enqueue(i);
  }
  console.log(line.getSize());
  console.log(line.peek());
  line.clear();
  console.log(line);
}
