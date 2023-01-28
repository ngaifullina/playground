class Model<T> {
  private state: T;
  private callback: (newValue: T) => void;

  constructor(initial: T) {
    this.state = initial;
    this.callback = (_) => {};
  }

  get(): T {
    return this.state;
  }

  set(newValue: T) {
    if (this.state !== newValue) {
      this.callback(newValue);
    }
    this.state = newValue;
  }

  onChange(callback: (newValue: T) => void) {
    this.callback = callback;
  }
}

export default Model;
