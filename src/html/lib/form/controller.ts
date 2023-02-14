import type { Model, View, Controller, FormState } from "./types";

class ControllerImpl implements Controller {
  private availableOptions: string[] = this.options;
  // todo (low priority) maybe not make it a field? does anybody else use it?

  private rowOptionSets: string[][] = [];

  constructor(
    private options: string[],
    private model: Model,
    private view: View
  ) {
    this.view.onPlusClick(() => this.insertRow());

    this.model.onChange((formState) => {
      const selectedOptions = formState.map(({ option }) => option);

      this.availableOptions = this.options.filter(
        (el) => selectedOptions.findIndex((option) => option === el) === -1
      );
      const calculatedRows = ControllerImpl.calculateRowOptionSets(
        this.options,
        formState.map(({ option }) => option)
      );
      calculatedRows.forEach(this.view.updateOptions);
    });
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
    return selectedOptions.map((selectedOption) =>
      allOptions.filter(
        (o) => o === selectedOption || !selectedOptionSet.has(o)
      )
    );
  }

  public onSubmit(cb: (fs: FormState) => void) {
    this.view.onSubmit(() => cb(this.model.get()));
  }

  /**
   * @throws Error if no options left available
   */
  private insertRow(): void {
    this.model.trigger();
    if (this.availableOptions[0]) {
      const onSelect = (option: string) => {
        console.log("onSelect", option, "-option");
        // todo update all selects with new option sets here
        // this.setOption(index, option);
      };

      this.view.insertRow(onSelect);
      this.addOption(this.availableOptions[0]!);
    } else {
      throw new Error(
        `Failed to insertRow: no options avalible,
        ${this.rowOptionSets}`
      );
    }
  }

  // private setOption(index: number, option: string): void {

  //   // 1. Model([{ option: "name" }, { option: "job" }])
  //   // 2. .setOption(1, "age")
  //   // 3. Model([..., { option: "job" }]) -> Model([..., { option: "age" }])
  //   // 4. ...???

  //   // throw "todo";
  // }

  private addOption(option: string) {
    this.model.get().push({ option });
    this.model.trigger();
  }

  // private deselectOption(name: string, option: string): void {
  //   const index = this.model.get();
  //   this.selectedOptions.trigger();
  // }
}

export default ControllerImpl;
