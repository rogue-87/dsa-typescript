import LinkedList from "./structures/LinkedList";
import ArrayList from "./structures/ArrayList";

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const arrayList = new ArrayList<number>([2, 5, 1, 8, 5, 9, 3, 1]);
console.log(arrayList.getData());
arrayList.sort((a, b) => a - b);
console.log(arrayList.getData());

console.log(arrayList.get(3));
arrayList.set(3, 4);
console.log(arrayList.get(3));

const linkedList = new LinkedList<number>();
for (let i = 0; i < 25; i++) {
  linkedList.append(getRandomInt(1, 1000));
}
for (let i = 0; i < 25; i++) {
  linkedList.prepend(getRandomInt(1, 1000));
}

for (let i = 1; i <= 10; i++) {
  linkedList.append(i);
}

linkedList.insert(99, 9, "after");

linkedList.forEach((data) => {
  console.log(data);
});
