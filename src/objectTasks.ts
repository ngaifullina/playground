export const makePairs = (object: Record<string, number>) =>
  Object.entries(object);
// console.log(makePairs({ a: 1, b: 2 }));

export const without = <T>(object: Record<string, T>, ...args: string[]) => {
  args.forEach((el: string) => delete object[el]);
  return object;
};
// const data = { a: 1, b: 2, c: 3 };
// console.log(without(data, "b", "c")); // { a: 1 }
