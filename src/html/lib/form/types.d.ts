export type FormRowState = {
  option: string;
  // value: string;
};

export type FormState = FormRowState[];

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
