import BaseModel from "../model.js";
import ViewImpl from "./view.js";
import ControllerImpl from "./controller.js";

import type { FormState } from "./types";
export { FormState };

export function open(
  options: string[],
  onSubmit: (formState: FormState) => void
) {
  const c = new ControllerImpl(
    options,
    new BaseModel([] as FormState),
    new ViewImpl()
  );

  c.onSubmit(onSubmit);
}
