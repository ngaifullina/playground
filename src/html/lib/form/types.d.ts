export type FormState = {
  option: string;
  // value: string;
}[];

export type Model = {
  get(): FormState;
  trimLast(): void;
  setOption(newOption: string, index: number): void;
  onChange(callback: (newValue: FormState) => void): void;
};

export type Direction = "+" | "-";

export type View = {
  enableButton(direction: Direction): void;
  disableButton(direction: Direction): void;
  insertRow(onSelect: (option: string) => void): void;
  deleteLastRow(): void;
  setOptions(newOptions: string[], index: number): void;
  onClick(direction: Direction, cb: () => void): void;
  onSubmit(cb: () => void): void;
};

export type Controller = {
  onSubmit(cb: (formState: FormState) => void): void;
};
