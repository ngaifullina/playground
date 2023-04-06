export type Field = {
  name: string;
  callback: (newValue: string) => void;
};

export const data: Field[] = [
  {
    name: "name",
    callback: (newValue: string) =>
      (document.querySelector("#nameToChange")!.textContent = newValue),
  },
  {
    name: "job",
    callback: (newValue: string) =>
      (document.querySelector("#jobToChange")!.textContent = newValue),
  },
  {
    name: "age",
    callback: (newValue: string) =>
      (document.querySelector("#ageToChange")!.textContent = newValue),
  },
  {
    name: "mail",
    callback: (newValue: string) =>
      (document.querySelector("#mailToChange")!.textContent = newValue),
  },
];
