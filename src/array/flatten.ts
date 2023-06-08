export const flatten = (array: any): number[] => {
  let acc: number[] = [];

  for (let item of array) {
    const itemFlatArray = typeof item === "number" ? [item] : flatten(item);
    acc = [...acc, ...itemFlatArray];
  }

  return acc;
};

// export const flatten = (array: any[]): number[] => {
//   return array.reduce((acc: number[], item: any) => {
//     if (typeof item === "number") {
//       acc.push(item);
//     } else {
//       acc.push(...flatten(item));
//     }
//     return acc;
//   }, []);
// };

// export const flatten = (array: any[]): number[] => {
//   let newArray: number[] = [];
//   array.forEach((el: any) => {
//     if (typeof el === "number") {
//       newArray.push(el);
//     } else {
//       newArray.push(...flatten(el));
//     }
//   });
//   return newArray;
// };
