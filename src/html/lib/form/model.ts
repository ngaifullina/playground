import { default as BaseModel, CalbackFn } from "../model.js";
import type { FormState, Model, CloseFn } from "./types";

export class ModelImpl implements Model {
  // todo support non-empty initial state
  // public static create(initialState: FormState | null): [Model, CloseFn] {

  public static create(): [Model, CloseFn] {
    const m = new ModelImpl();
    return [m, () => m.close()];
  }

  private cancelHandlers: CloseFn[] = [];
  private options: BaseModel<string[]>;
  private values: string[];

  private constructor() {
    this.options = new BaseModel<string[]>([]);
    this.values = [];
  }

  public get(): FormState {
    return this.options
      .get()
      .map((el, i) => ({ option: el, value: this.values[i]! }));
  }

  public trimLast() {
    this.options.get().pop();
    this.options.trigger();
  }

  public setOption(newOption: string, index: number) {
    this.options.get()[index] = newOption;
    this.options.trigger();
  }

  public getOptions() {
    return this.options.get();
  }

  public setValue(newValue: string, index: number) {
    this.values[index] = newValue;
  }

  public getValues() {
    return this.values;
  }

  public onOptionChange(callback: CalbackFn<string[]>): void {
    this.cancelHandlers.push(this.options.onChange(callback));
  }

  private close() {
    console.log("in model close");
    this.cancelHandlers.forEach((fn) => fn());
    this.options.set([]);
  }
}
