/*
 * Complete the 'countApplesAndOranges' function below.
 *
 * The function accepts following parameters:
 *  1. INTEGER s
 *  2. INTEGER t
 *  3. INTEGER a
 *  4. INTEGER b
 *  5. INTEGER_ARRAY apples
 *  6. INTEGER_ARRAY oranges
 */

function countApplesAndOranges(
  s: number,
  t: number,
  a: number,
  b: number,
  apples: number[],
  oranges: number[]
): void {
  const applesDistance = apples
    .map((el) => el + a)
    .filter((el) => el >= s && el <= t).length;
  const orangeDistance = oranges
    .map((el) => el + b)
    .filter((el) => el >= s && el <= t).length;
  console.log(applesDistance);
  console.log(orangeDistance);
}
countApplesAndOranges(7, 11, 5, 15, [3, 2], [-2, 2, 1]);
