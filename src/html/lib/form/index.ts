import BaseModel from "../model.js";

import ModelImpl from "./model.js";
import ViewImpl from "./view.js";
import ControllerImpl from "./controller.js";

import type { FormState } from "./types";
export type { FormState };

export function open(
  options: string[],
  onSubmit: (formState: FormState) => void
) {
  const c = new ControllerImpl(
    options,
    new ModelImpl(new BaseModel<FormState>([])),
    new ViewImpl(document.querySelector(".popup")!)
  );

  c.onSubmit(onSubmit);
}
