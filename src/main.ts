import { Stack } from "./structures/Stacks.js";

const st = new Stack<number>();

st.push(2);

st.forEach((data) => {
  console.log(data);
});

console.log(st);
