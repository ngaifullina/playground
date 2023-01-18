// Private recursive function example

export type Fibonacci = (n: number) => number;

export const fibonacci: Fibonacci = (n) => {
  if (n < 0) throw new Error(`Received negative N for fibonacci input: ${n}`);
  return fibonacciLoop(0, 1, n);
};

const fibonacciLoop = (
  prev: number,
  current: number,
  remainingIterations: number
): number => {
  if (remainingIterations <= 0) {
    return prev;
  } else {
    return fibonacciLoop(current, current + prev, remainingIterations - 1);
  }
};
// fibonacci(5);

export const fibonacciSimple = (n: number) => {
  if (n < 0) throw new Error(`Received negative N for fibonacci input: ${n}`);

  let a = 0,
    b = 1,
    c = n;

  for (let i = 2; i <= n; i++) {
    c = a + b;
    a = b;
    b = c;
  }

  return c;
};

const fibonacciArray = (n: number) => {
  if (n <= 1) {
    return n;
  }

  const result = [0, 1];

  for (let i = 2; i <= n; i++) {
    result[i] = result[i - 2] + result[i - 1];
  }

  return result[result.length - 1];
};

const fibonacciRecursion = (n: number) => {
  if (n <= 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
};

export const fibonacciIndex = (n: number) => {
  if (n < 0) throw new Error(`Received negative N for fibonacci input: ${n}`);

  let index = 1;
  let a = 1;
  let b = 1;
  let sum = 0;
  while (sum <= n) {
    sum = a + b;
    a = b;
    b = sum;
    index++;
  }
  return index;
};
console.log(fibonacciIndex(21));
