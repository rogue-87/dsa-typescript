import LinkedList from "./structures/LinkedList";
import getRandomInt from "./utils/generateRandomInt";
// import ArrayList from "./structures/ArrayList";

/*
const arrayList = new ArrayList<number>([2, 5, 1, 8, 5, 9, 3, 1]);
console.log(arrayList.getData());
arrayList.sort((a, b) => a - b);
console.log(arrayList.getData());

console.log(arrayList.get(3));
arrayList.set(3, 4);
console.log(arrayList.get(3));
*/

const linkedList = new LinkedList<number>();

for (let i = 1; i <= 10; i++) {
  linkedList.append(i);
}

linkedList.forEach((data) => {
  console.log(data);
});

let num = getRandomInt(1, 9);
console.log(`
==============================
            random num is: ${num}
==============================`);
linkedList.remove(num);

linkedList.forEach((data) => {
  console.log(data);
});
