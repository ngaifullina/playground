import BaseModel from "../model.js";

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
  const [model, closeModel] = ModelImpl.create(new BaseModel<FormState>([]));
  const [view, closeView] = ViewImpl.create(root);
  const controller = ControllerImpl.create(options, model, view);
  controller.onSubmit((fs) => {
    onSubmit(fs);
    closeModel();
    closeView();
  });
}

// alternative view creation
// const [view, viewLifecycle]: [View, Lifecycle] = (() => {
//   const impl = new ViewImpl(document.querySelector(".popup")!);
//   return [impl, impl];
// })();
