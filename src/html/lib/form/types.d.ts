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
  insertRow(options: string[], onSelect: (newValue: string) => void): void;
  deleteLastRow(): void;
  updateOptions(position: number, newOptions: string[]): void;
  onPlusClick(cb: () => void): void;
  onMinusClick(cb: () => void): void;
  onSubmit(cb: () => void): void;
};
