export const sleep = (milliseconds: number): Promise<number> =>
  new Promise((resolve) =>
    setTimeout(() => resolve(milliseconds), milliseconds)
  );
