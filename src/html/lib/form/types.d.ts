export type FormState = {
  option: string;
  value: string;
}[];

export type CloseFn = () => void;

// export type Lifecycle = {
//   close(): void;
// };

export type Model = {
  get(): FormState;
  trimLast(): void;
  setOption(newOption: string, index: number): void;
  getOptions(): string[];
  setValue(newValue: string, index: number): void;
  getValues(): string[];
  onOptionChange(callback: (newOptions: string[]) => void): void;
};

export type Direction = "+" | "-";

export type View = {
  enableButton(direction: Direction): void;
  disableButton(direction: Direction): void;
  insertRow(
    onSelect: (option: string) => void,
    onInputChange: (value: string) => void
  ): void;
  deleteLastRow(): void;
  setAvailableOptions(newOptions: string[], index: number): void;
  setValue(value: string, index: number);
  onClick(direction: Direction, cb: () => void): void;
  onSubmit(cb: () => void): void;
  showError(): void;
  setSelectedOption(value: string, index: number): void;
};

export type Controller = {
  onSubmit(cb: (formState: FormState) => void): void;
};
