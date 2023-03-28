export const makePairs = (object: Record<string, number>) =>
  Object.entries(object);
// console.log(makePairs({ a: 1, b: 2 }));

export const without = <T>(object: Record<string, T>, ...args: string[]) => {
  args.forEach((el: string) => delete object[el]);
  return object;
};
// const data = { a: 1, b: 2, c: 3 };
// console.log(without(data, "b", "c")); // { a: 1 }

const fn: Fn = () => console.log("111");
const fn2: Fn = () => console.log("222");

type Fn = () => void;
const buttonCallbacks: Record<string, Fn[]> = {
  "+": [fn, fn2],
  "-": [fn2],
};

const result: Fn[] = buttonCallbacks["-"].concat(buttonCallbacks["+"]);
// console.log(result);
result.forEach((fn) => fn());
// for (let v of Object.values(buttonCallbacks)) {
//   for (let f of v) {
//     f();
//   }
// }
