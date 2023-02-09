import type { Model, View, Controller, FormState } from "./types";

class ControllerImpl implements Controller {
  constructor(
    private options: string[],
    private model: Model,
    private view: View
  ) {
    this.view.onPlusClick(() => this.insertRow());
  }

  public onSubmit(cb: (fs: FormState) => void) {
    this.view.onSubmit(() => cb(this.model.get()));
  }

  private insertRow() {
    const onSelect = (selectedOption: string) => {
      console.log(`Selected option ${selectedOption}`);
    };
    const availableOptions = this.getAvailableOptions();
    this.view.insertRow(availableOptions, onSelect);
    if (availableOptions[0]) this.selectOption(availableOptions[0]);
  }

  private selectOption(opt: string) {
    this.model.get().push({ option: opt });
    this.model.trigger();
  }

  private getAvailableOptions() {
    const selectedOptions = this.model.get().map(({ option }) => option);

    return this.options.filter(
      (el) => selectedOptions.findIndex((option) => option === el) === -1
    );
  }
}

export default ControllerImpl;
