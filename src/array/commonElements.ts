const first = [1, 2, 3, 4];
const second = [3, 4, 5, 6];

function common(a: Array<number>, b: Array<number>) {
  let obj: Record<number, number> = {};
  let commonArr: Array<number> = [];
  a.map((el) => (obj[el] = el));
  for (let i = 0; i <= b.length; i++) {
    if (obj[b[i]]) {
      commonArr.push(b[i]);
    }
  }
  return commonArr;
}
