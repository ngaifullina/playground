import type { default as BaseModel, CalbackFn } from "../model";
import type { FormState, Model, CloseFn } from "./types";

export class ModelImpl implements Model {
  public static create(model: BaseModel<FormState>): [Model, CloseFn] {
    if (model.get().length > 0) {
      throw new Error("Non-empty model found");
    }

    const m = new ModelImpl(model);
    return [m, () => m.close()];
  }

  private cancelHandlers: CloseFn[] = [];

  private constructor(private model: BaseModel<FormState>) {}

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
    this.cancelHandlers.push(this.model.onChange(callback));
  }

  private close() {
    this.cancelHandlers.forEach((fn) => fn());
    this.model.set([]);
  }
}
