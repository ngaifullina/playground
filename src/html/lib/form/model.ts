import type { Field } from "../data.js";
import StateModel from "../model.js";

class Model {
  private selectedOptions: StateModel<Set<string>>;

  constructor(
    private options: Field[] // private onSubmit: (formState: any) => void
  ) {
    this.selectedOptions = new StateModel(new Set());
  }
  getAvailableOptions() {
    return this.options
      .map((el) => el.name)
      .filter((el) => !this.selectedOptions.get().has(el));
  }
}
export default Model;
