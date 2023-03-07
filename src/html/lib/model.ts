export type CalbackFn<T> = (newValue: T) => void;

export type SubscriptionId = symbol;

class BaseModel<T> {
  private state: T;
  private callbacks: Map<symbol, CalbackFn<T>> = new Map();

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

  public onChange(callback: CalbackFn<T>): SubscriptionId {
    const id = Symbol();
    this.callbacks.set(id, callback);
    return id;
  }

  public unsubscribe(subscriptionId: SubscriptionId): void {
    this.callbacks.delete(subscriptionId);
  }
}

export default BaseModel;

// todo derive one model from another, e.g.
// `const derivedModel = originamModel.map(deriveFn)`;
