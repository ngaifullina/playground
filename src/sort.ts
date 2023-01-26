export namespace number {
  /**
   * Uses JS `<` for comparison
   */
  export const asc = (arr: number[]): number[] => {
    return arr.sort();
  };

  /**
   * Uses JS `>` for comparison
   */
  export const desc = (arr: number[]): number[] => {
    return arr.sort((a, b) => b - a);
  };
}

export namespace user {
  export type User = {
    name: string;
    age: 16;
  };

  /**
   * Uses JS `<` for comparison
   */
  export const ageDesc = (arr: User[]): User[] => {
    throw "todo";
  };

  /**
   * Uses JS `<` for comparison
   */
  export const nameDesc = (arr: User[]): User[] => {
    throw "todo";
  };
}
