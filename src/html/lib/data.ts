import BaseModel from "./model.js";

type FieldModelValue = { option: string; optionValue: string };

export type Field = {
  name: string;
  model: BaseModel<FieldModelValue>;
  callback: (newValue: string) => void;
};

export const data: Field[] = [
  {
    name: "name",
    model: new BaseModel({ option: "", optionValue: "" }),
    callback: (newValue: string) =>
      (document.querySelector("#nameToChange")!.textContent = newValue),
  },
  {
    name: "job",
    model: new BaseModel({ option: "", optionValue: "" }),
    callback: (newValue: string) =>
      (document.querySelector("#jobToChange")!.textContent = newValue),
  },
  {
    name: "age",
    model: new BaseModel({ option: "", optionValue: "" }),
    callback: (newValue: string) =>
      (document.querySelector("#jobToChange")!.textContent = newValue),
  },
];
