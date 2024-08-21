import ArrayList from "./structures/ArrayList";

const list = new ArrayList<number>();

list.add(1);
list.add(3);
list.add(4);
list.add(2, 1);

console.log(list.getData());
