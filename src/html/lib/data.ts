import Model from "./model.js";

type FieldModelValue = { option: string; optionValue: string };

export type Field = {
  name: string;
  used: boolean;
  model: Model<FieldModelValue>;
  callback: (newValue: string) => void;
};

export const data: Field[] = [
  {
    name: "name",
    used: false,
    model: new Model({ option: "", optionValue: "" }),
    callback: (newValue: string) =>
      (document.querySelector("#nameToChange")!.textContent = newValue),
  },
  {
    name: "job",
    used: false,
    model: new Model({ option: "", optionValue: "" }),
    callback: (newValue: string) =>
      (document.querySelector("#jobToChange")!.textContent = newValue),
  },
  {
    name: "age",
    used: false,
    model: new Model({ option: "", optionValue: "" }),
    callback: (newValue: string) =>
      (document.querySelector("#jobToChange")!.textContent = newValue),
  },
];
