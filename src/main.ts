import LinkedList from "./structures/LinkedList.js";

const ls = new LinkedList<number>();
/* for (let index = 0; index < 10; index++) {
  ls.append(index);
} */

ls.reverse();

ls.forEach((data) => {
  console.log(data);
});

ls.reverse();

ls.forEach((data) => {
  console.log(data);
});
