export type CalbackFn<T> = (newValue: T) => void;

class BaseModel<T> {
  private state: T;
  private callback: CalbackFn<T> = () => {};

  constructor(initial: T) {
    this.state = initial;
  }

  public get(): T {
    return this.state;
  }

  public set(newValue: T): void {
    this.state = newValue;
    this.trigger();
  }

  public trigger(): void {
    this.callback(this.state);
  }

  public onChange(callback: CalbackFn<T>): void {
    this.callback = callback;
  }
}

export default BaseModel;

// todo derive one model from another, e.g.
// `const derivedModel = originamModel.map(deriveFn)`;
