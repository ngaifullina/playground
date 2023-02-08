import type { Controller, FormState, View } from "./types";
import type Model from "./model";

class ControllerImpl implements Controller {
  model;
  view;

  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;

    this.view.onPlusClick(() => this.insertRow());
  }

  // ???
  public onSubmit(cb: (formState: FormState) => void) {
    this.view.onSubmit(() => cb([]));
  }

  private insertRow() {
    const options = this.model.getAvailableOptions();

    const onSelect = (selectedOption: string) => {
      console.log(`Selected option ${selectedOption}`);
    };

    this.view.insertRow(options, onSelect);
  }
}

export default ControllerImpl;
