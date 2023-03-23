export type CalbackFn<T> = (newValue: T) => void;
export type CancelFn = () => void;

class BaseModel<T> {
  private state: T;
  private callbacks: Set<CalbackFn<T>> = new Set();

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
    this.callbacks.forEach((cb) => cb(this.state));
  }

  public onChange(callback: CalbackFn<T>): CancelFn {
    this.callbacks.add(callback);

    return () => {
      this.callbacks.delete(callback);
    };
  }
}

export default BaseModel;

// todo derive one model from another, e.g.
// `const derivedModel = originamModel.map(deriveFn)`;
