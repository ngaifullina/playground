import { ModelImpl } from "./model.js";
import { ViewImpl } from "./view.js";
import { ControllerImpl } from "./controller.js";

import type { FormState } from "./types";
export type { FormState };

export function open(
  root: HTMLElement,
  options: string[],
  onSubmit: (formState: FormState) => void
) {
  console.log("opening form");
  const [model, closeModel] = ModelImpl.create();
  const [view, closeView] = ViewImpl.create(root);
  const [controller, closeController] = ControllerImpl.create(
    options,
    model,
    view
  );
  controller.onSubmit((fs) => {
    onSubmit(fs);
    closeView();
    closeModel();
    closeController();
  });
}

// alternative view creation
// const [view, viewLifecycle]: [View, Lifecycle] = (() => {
//   const impl = new ViewImpl(document.querySelector(".popup")!);
//   return [impl, impl];
// })();
