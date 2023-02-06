import Model from "./model.js";

type FieldModelValue = { option: string; optionValue: string };

export type Field = {
  name: string;
  model: Model<FieldModelValue>;
  callback: (newValue: string) => void;
};

export const data: Field[] = [
  {
    name: "name",
    model: new Model({ option: "", optionValue: "" }),
    callback: (newValue: string) =>
      (document.querySelector("#nameToChange")!.textContent = newValue),
  },
  {
    name: "job",
    model: new Model({ option: "", optionValue: "" }),
    callback: (newValue: string) =>
      (document.querySelector("#jobToChange")!.textContent = newValue),
  },
  {
    name: "age",
    model: new Model({ option: "", optionValue: "" }),
    callback: (newValue: string) =>
      (document.querySelector("#jobToChange")!.textContent = newValue),
  },
];
