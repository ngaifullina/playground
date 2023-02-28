import type { Model, View, Controller, FormState } from "./types";
export enum Button {
  Plus,
  Minus,
}

class ControllerImpl implements Controller {
  private calculatedRows: string[][] = [];
  constructor(
    private readonly options: string[],
    private model: Model,
    private view: View // private calculatedRows: string[][]
  ) {
    this.calculatedRows[0] = this.options;
    this.view.onClick(Button.Plus, () => this.insertRow());
    this.view.onClick(Button.Minus, () => this.deleteLastRow());

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
      this.view.updateButtonState(Button.Plus, row.length <= 1);
      this.view.updateButtonState(
        Button.Minus,
        row.length === this.options.length
      );
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
    const updateModelWith = (newOption: string) => {
      this.model.get()[index] = { option: newOption };
      this.model.trigger();
    };

    this.view.insertRow(updateModelWith);

    updateModelWith(nextOptionToSelect);
  }

  private deleteLastRow(): void {
    this.model.get().pop();
    this.model.trigger();
    this.view.deleteLastRow();
  }
}

export default ControllerImpl;
