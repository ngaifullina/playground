import type View from "./view";
import type Model from "./model";

class Controller {
  model;
  view;
  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;
  }
}

export default Controller;
