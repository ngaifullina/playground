import type { Controller, FormState, Model, View, CloseFn } from "./types";

export class ControllerImpl implements Controller {
  private calculatedRows: string[][] = [];

  public static create(
    options: string[],
    model: Model,
    view: View
  ): [Controller, CloseFn] {
    const c = new ControllerImpl(options, model, view);
    return [c, () => c.close()];
  }

  private constructor(
    private readonly options: string[],
    private model: Model,
    private view: View // private calculatedRows: string[][]
  ) {
    const fields: FormState | null = JSON.parse(
      localStorage.getItem("fields") || "[]"
    );
    if (fields?.length) {
      fields.forEach(({ option, value }, i) => {
        this.model.setOption(option, i);
        this.model.setValue(value, i);
        this.view.insertRow(
          (option) => this.model.setOption(option, i),
          (value) => this.model.setValue(value, i)
        );
        this.view.setValue(value, i);
      });

      this.updateOptions(fields.map((el) => el.option));
    }
    this.model.onOptionChange((fs) => this.updateOptions(fs));

    this.calculatedRows[0] = this.options;
    this.view.onClick("+", () => this.insertRow());
    this.view.onClick("-", () => this.deleteLastRow());

    // this.insertRow();
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
  public static calculateRowOptionSets(
    allOptions: string[],
    selectedOptions: string[]
  ): string[][] {
    const selectedOptionSet = new Set(selectedOptions);
    return selectedOptions.map((option) =>
      allOptions.filter((o) => o === option || !selectedOptionSet.has(o))
    );
  }

  private updateOptions(newFormState: string[]) {
    this.calculatedRows = ControllerImpl.calculateRowOptionSets(
      this.options,
      newFormState
    );
    this.calculatedRows.forEach((row, index) => {
      row.length <= 1
        ? this.view.disableButton("+")
        : this.view.enableButton("+");

      row.length === this.options.length
        ? this.view.disableButton("-")
        : this.view.enableButton("-");

      this.view.setOptions(row, index);
    });
  }

  private static getOptions(fs: FormState) {
    return fs.map(({ option }) => option);
  }

  public onSubmit(cb: (fs: FormState) => void) {
    this.view.onSubmit(() => {
      if (this.checkEmptyField()) {
        this.view.showError();
        return;
      }
      this.saveFields();
      cb(this.model.get());
      this.close();
    });
  }

  public close() {
    this.view.enableButton("+");
  }
  /**
   * @throws Error if no options left available
   */
  private insertRow(): void {
    const formState = this.model.get();
    const selectedOptionSet = new Set(ControllerImpl.getOptions(formState));

    const nextOptionToSelect = this.options.find(
      (el) => !selectedOptionSet.has(el)
    );
    if (!nextOptionToSelect) return;

    const index = formState.length;

    this.view.insertRow(
      (option) => this.model.setOption(option, index),
      (value) => this.model.setValue(value, index)
    );

    this.model.setOption(nextOptionToSelect!, index);
  }

  private deleteLastRow(): void {
    this.model.trimLast();
    this.view.deleteLastRow();
  }

  private checkEmptyField(): boolean {
    const values = this.model.get().map((el) => el.value);
    return values.length === 0 || values.some((el) => !el);
  }

  private saveFields() {
    localStorage.setItem("fields", JSON.stringify(this.model.get()));
  }
}
