import type BaseModel from "../model.js";
import { Button } from "./controller";

export type FormState = {
  option: string;
  // value: string;
}[];

export type Model = BaseModel<FormState>;

// todo
// export type Model2 = {
//   setOption(option: string, index: number): void;
//   deleteLastRow(): void;
// };

export type Controller = {
  onSubmit(cb: (formState: FormState) => void);
};

export type View = {
  updateButtonState(button: Button, activeState: boolean): void;
  insertRow(onSelect: (option: string) => void): void;
  // onClick(select: HTMLSelectElement): void;
  deleteLastRow(): void;
  setOptions(newOptions: string[], index: number): void;
  onClick(button: Button, cb: () => void): void;
  onSubmit(cb: () => void): void;
};
