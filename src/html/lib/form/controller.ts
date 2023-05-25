import type { Controller, FormState, Model, View, CloseFn } from "./types";

export class ControllerImpl implements Controller {
  private static LOCAL_STORAGE_KEY = "currentFormState";

  private calculatedRows: string[][] = [];

  public static create(
    options: string[],
    model: Model,
    view: View
  ): [Controller, CloseFn] {
    const initialState: FormState = ControllerImpl.localStorageRead();
    const c = new ControllerImpl(options, model, view, initialState);
    return [c, () => c.close()];
  }

  protected constructor(
    private readonly options: string[],
    private model: Model,
    private view: View,
    initialState: FormState
  ) {
    if (!options.length) {
      throw new Error("Attempted to create form with no options");
    }

    const formState: FormState = initialState.length
      ? initialState
      : [
          {
            option: options[0]!, // ! is unreachable
            value: "",
          },
        ];

    this.model.onOptionChange(() => this.updateAvailableOptions());

    formState.forEach(({ option, value }, index) => {
      this.insertRow(option, value, index);
    });

    this.view.onClick("+", () => this.onPlusClick());
    this.view.onClick("-", () => this.deleteLastRow());
  }

  public onSubmit(cb: (fs: FormState) => void) {
    this.view.onSubmit(() => {
      if (this.isFieldEmptyOrMissing()) {
        this.view.showError();
        return;
      }
      ControllerImpl.localStorageClear();
      cb(this.model.get());
    });
  }

  public close() {
    this.view.enableButton("+");
  }

  /**
   * @argument {string[]} allOptions all available options
   * @argument {FormState} formState FormState instance
   * @returns {string[][]} Array of arrays of available options for each select
   * Example:
   * [
   *   ["name", "job", "age"],
   *   ["name", "age"],
   *   ["age"]
   * ]
   */
  protected static calculateRowOptionSets(
    allOptions: string[],
    selectedOptions: string[]
  ): string[][] {
    const selectedOptionSet = new Set(selectedOptions);
    return selectedOptions.map((option) =>
      allOptions.filter((o) => o === option || !selectedOptionSet.has(o))
    );
  }

  private updateAvailableOptions() {
    this.calculatedRows = ControllerImpl.calculateRowOptionSets(
      this.options,
      this.model.getOptions()
    );
    this.calculatedRows.forEach((row, index) => {
      row.length <= 1
        ? this.view.disableButton("+")
        : this.view.enableButton("+");

      row.length === this.options.length
        ? this.view.disableButton("-")
        : this.view.enableButton("-");

      this.view.setAvailableOptions(row, index);
    });
  }

  private onPlusClick() {
    const selectedOptionSet = new Set(this.model.getOptions());

    const nextOptionToSelect = this.options.find(
      (el) => !selectedOptionSet.has(el)
    );
    if (!nextOptionToSelect) return;

    const index = selectedOptionSet.size;

    this.insertRow(nextOptionToSelect, "", index);
  }

  private insertRow(option: string, value: string, index: number): void {
    this.view.insertRow(
      (o) => {
        this.model.setOption(o, index);
        this.localStorageUpdate();
      },
      (v) => {
        this.model.setValue(v, index);
        this.localStorageUpdate();
      }
    );

    this.model.setOption(option, index);
    this.model.setValue(value, index);

    this.view.setSelectedOption(option, index);
    this.view.setValue(value, index);

    this.localStorageUpdate();
  }

  private deleteLastRow(): void {
    this.model.trimLast();
    this.view.deleteLastRow();
  }

  // todo different user-friendly validation errors
  private isFieldEmptyOrMissing(): boolean {
    const values = this.model.getValues();
    return values.length === 0 || values.some((el) => !el);
  }

  private static localStorageRead(): FormState {
    return JSON.parse(
      localStorage.getItem(ControllerImpl.LOCAL_STORAGE_KEY) || "[]"
    );
  }

  private static localStorageClear() {
    localStorage.removeItem(ControllerImpl.LOCAL_STORAGE_KEY);
  }

  // todo resolve potential multiple instances conflicts
  private localStorageUpdate() {
    localStorage.setItem(
      ControllerImpl.LOCAL_STORAGE_KEY,
      JSON.stringify(this.model.get())
    );
  }
}
