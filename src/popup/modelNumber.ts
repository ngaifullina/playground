class ModelNumber {
  private state: number;
  private callback: (newValue: number) => void;

  constructor(initial: number) {
    this.state = initial;
    this.callback = (_) => {};
  }

  get(): number {
    return this.state;
  }

  set(newValue: number) {
    if (this.state !== newValue) {
      this.callback(newValue);
    }
    this.state = newValue;
    console.log(this.state, "- this.state", newValue, "-newValue");
  }

  onChange(callback: (newValue: number) => void) {
    this.callback = callback;
  }
}

export default ModelNumber;
