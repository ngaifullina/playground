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
  //todo why not remainingIterations === 0
  if (remainingIterations <= 0) {
    return prev;
  } else {
    console.log(prev, current, remainingIterations, "fibonacciLoop");
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
