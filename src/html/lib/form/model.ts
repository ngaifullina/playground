import type { default as BaseModel, CalbackFn } from "../model";
import type { FormState, Model } from "./types";

class ModelImpl implements Model {
  constructor(private model: BaseModel<FormState>) {}

  public get() {
    return this.model.get();
  }

  public trimLast() {
    this.model.get().pop();
    this.model.trigger();
  }

  public setOption(newOption: string, index: number) {
    this.model.get()[index] = { option: newOption };
    this.model.trigger();
  }

  public onChange(callback: CalbackFn<FormState>): void {
    this.model.onChange(callback);
  }
}

export default ModelImpl;
