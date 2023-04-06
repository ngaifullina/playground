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
    this.calculatedRows[0] = this.options;

    this.view.onClick("+", () => this.insertRow());
    this.view.onClick("-", () => this.deleteLastRow());
    this.model.onOptionChange((fs) => this.updateOptions(fs));
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
    this.close();
    this.view.onSubmit(() => cb(this.model.get()));
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
}
