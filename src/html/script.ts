import Controller from "./lib/form/controller.js";
import Model from "./lib/form/model.js";
import View from "./lib/form/view.js";
import { data } from "./lib/data.js";

// @ts-ignore
const controller = new Controller(new Model(data), new View());
