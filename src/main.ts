import ArrayList from "./structures/ArrayList";

const list = new ArrayList<number>([2, 5, 1, 8, 5, 9, 3, 1]);
console.log(list.getData());
list.sort((a, b) => a - b);
console.log(list.getData());

console.log(list.get(3));
list.set(3, 4);
console.log(list.get(3));
