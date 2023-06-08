export const clone = <T>(value: T): T => {
  switch (typeof value) {
    case "undefined":
      return undefined as T; // todo without type cast

    case "string":
      if (!value) return "" as T;
      return value;

    case "object":
      if (value === null) return null as T;

      if (Array.isArray(value)) {
        return value.map(clone) as T;
      }

      // return Object.entries(value).reduce(
      //   (acc, [k, v]) => ((acc[k] = clone(v)), acc),
      //   {}
      // ) as T;

      // return Object.fromEntries(
      // Object.entries(value).map(([k, v]) => [k, clone(v)])
      // ) as T;

      const res: any = {};
      // Object.entries(value).forEach(([k, v]) => (res[k] = v));
      for (let k in value) {
        res[k] = clone(value[k]);
      }
      return res as T;

    default:
      return value;
  }
};
