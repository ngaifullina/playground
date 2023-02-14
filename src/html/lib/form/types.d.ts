import type BaseModel from "../model.js";

export type FormState = {
  option: string;
  // value: string;
}[];

export type Model = BaseModel<FormState>;

export type Controller = {
  onSubmit(cb: (formState: FormState) => void);
};

export type View = {
  insertRow(onSelect: (option: string) => void): void;
  // onClick(select: HTMLSelectElement): void;
  deleteLastRow(): void;
  updateOptions(newOptions: string[], index: number): void;
  onPlusClick(cb: () => void): void;
  onMinusClick(cb: () => void): void;
  onSubmit(cb: () => void): void;
};
