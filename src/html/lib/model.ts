export type CalbackFn<T> = (newValue: T) => void;

class Model<T> {
  private state: T;
  private callback: CalbackFn<T> = () => {};

  constructor(initial: T) {
    this.state = initial;
  }

  public get(): T {
    return this.state;
  }

  public set(newValue: T) {
    this.state = newValue;
    this.trigger();
  }

  public trigger() {
    this.callback(this.state);
  }

  public onChange(callback: CalbackFn<T>) {
    this.callback = callback;
  }
}

export default Model;

// todo derive one model from another, e.g.
// `const derivedModel = originamModel.map(deriveFn)`;
