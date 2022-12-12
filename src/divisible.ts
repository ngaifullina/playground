export namespace divisible {
  export const lower = (divisible: number, divider: number): number =>
    divisible - (divisible % divider);

  export const upper = (divisible: number, divider: number): number =>
    lower(divisible, divider) + divider;
}

function round(grades: number[]): number[] {
  return grades.map((el) => {
    if (5 - (el % 5) < 3 && el >= 38) {
      return divisible.upper(el, 5);
    } else {
      return el;
    }
  });
}
console.log(round([73, 67, 38, 33]));
