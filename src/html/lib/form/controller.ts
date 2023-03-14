import type { Controller, FormState, Model, View } from "./types";

export class ControllerImpl implements Controller {
  private calculatedRows: string[][] = [];

  public static create(
    options: string[],
    model: Model,
    view: View
  ): Controller {
    return new ControllerImpl(options, model, view);
  }

  private constructor(
    private readonly options: string[],
    private model: Model,
    private view: View // private calculatedRows: string[][]
  ) {
    this.calculatedRows[0] = this.options;

    this.view.onClick("+", () => this.insertRow());
    this.view.onClick("-", () => this.deleteLastRow());
    this.model.onChange((fs) => this.updateOptions(fs));
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

  private updateOptions(newFormState: FormState) {
    this.calculatedRows = ControllerImpl.calculateRowOptionSets(
      this.options,
      ControllerImpl.getOptions(newFormState)
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
    this.view.onSubmit(() => cb(this.model.get()));
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
    if (!nextOptionToSelect) {
      throw new Error(`Failed to insertRow: no options avalible`);
    }

    const index = formState.length;

    this.view.insertRow((nextOptionToSelect) =>
      this.model.setOption(nextOptionToSelect, index)
    );

    this.model.setOption(nextOptionToSelect, index);
  }

  private deleteLastRow(): void {
    this.model.trimLast();
    this.view.deleteLastRow();
  }
  close(): void {}
}
