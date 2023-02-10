import type { Model, View, Controller, FormState } from "./types";

class ControllerImpl implements Controller {
  private availableOptions: string[];

  constructor(
    private options: string[],
    private model: Model,
    private view: View
  ) {
    this.view.onPlusClick(() => this.insertRow());

    // todo optimize when implementing `value` update
    // otherwise, this will trigger on every value change
    this.availableOptions = options;
    this.model.onChange((formState) => {
      this.availableOptions = this.options.filter(
        (el) =>
          formState
            .map(({ option }) => option)
            .findIndex((option) => option === el) === -1
      );
    });

    // todo optimize when implementing `value` update
    // otherwise, this will trigger on every value change
    this.model.onChange((formState) => {
      const rowOptionSets = ControllerImpl.calculateRowOptionSets(
        this.options,
        formState
      );
      // todo call updateOptions(index, options) for each row
    });
  }

  /**
   * @argument {string[]} options all available options
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
    options: string[],
    formState: FormState
  ): string[][] {
    const deleteElementsFromArray = (arrToDelete: string[], arr: string[]) => {
      const indexes = arrToDelete.map((el) => arr.indexOf(el));
      for (let i = 0; i < indexes.length; i++) {
        arr = arr.filter((el) => arr.indexOf(el) !== indexes[i]);
      }
      return arr;
    };

    return formState
      .map(({ option }) => option)
      .map((option, _, arr) => {
        return deleteElementsFromArray(
          arr.filter((el) => el !== option),
          options
        );
      });
  }

  public onSubmit(cb: (fs: FormState) => void) {
    this.view.onSubmit(() => cb(this.model.get()));
  }

  /**
   * @throws Error if no options left available
   */
  private insertRow(): void {
    if (this.availableOptions[0]) {
      const index = this.options.length - this.availableOptions.length;

      const onSelect = (option: string) => {
        console.log("onSelect");
        // todo update all selects with new option sets here
        this.setOption(index, option);
        // const selectOpt = Array.from(select.options).map((o) => o.label);
        // selectOpt.forEach((opt) => {
        //   if (selected.includes(opt) && opt !== selectOpt[selectedIndex]) {
        //     select.remove(selectOpt.indexOf(opt));
        //   }
        // });
      };

      this.view.insertRow(this.availableOptions, onSelect);
      this.addOption(this.availableOptions[0]);
    } else {
      throw new Error("Failed to insertRow: no options avalible");
    }
  }

  private setOption(index: number, option: string): void {
    console.log(`selected option ${option} at index ${index}`);

    // 1. Model([{ option: "name" }, { option: "job" }])
    // 2. .setOption(1, "age")
    // 3. Model([..., { option: "job" }]) -> Model([..., { option: "age" }])
    // 4. ...???

    // throw "todo";
  }

  private addOption(option: string) {
    this.model.get().push({ option });
    this.model.trigger();
  }

  private prepareOptionSets(): string[][] {
    throw "todo";
  }

  // private deselectOption(name: string, option: string): void {
  //   const index = this.model.get();
  //   this.selectedOptions.trigger();
  // }
}

export default ControllerImpl;
