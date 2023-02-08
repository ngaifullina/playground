import StateModel from "./model.js";

describe("modelNumber", () => {
  const VALUE = 10;
  const VALUE_1 = 20;
  const VALUE_2 = 30;

  const newModel = () => new StateModel(VALUE);

  test("should return initial value", () => {
    const model = newModel();
    expect(model.get()).toBe(VALUE);
  });

  test("should set value and return updated one", () => {
    const model = newModel();
    expect(model.get()).toBe(VALUE);
    model.set(VALUE_1);
    expect(model.get()).toBe(VALUE_1);
  });

  describe("subscription", () => {
    test("should trigger callback after subscription, but not before", () => {
      const model = newModel();

      let managedValue = model.get();
      const updateManagedValue = (newValue: number) => {
        managedValue = newValue;
      };

      // managedValue does not change, because not subscribed yet
      model.set(VALUE_1);
      expect(managedValue).toBe(VALUE);

      // subscribing `managedValue` to model updates
      model.onChange(updateManagedValue);

      model.set(VALUE_2);

      expect(managedValue).toBe(VALUE_2);
    });

    describe("trigger", () => {
      test("supports manual internal mutable operation", () => {
        const callback = jest.fn(() => {});
        const model = new StateModel([0]);
        model.onChange(callback);

        // common use case: read, modify collection and save result
        let internalArray = model.get();
        internalArray.pop();
        internalArray.push(1);
        model.trigger();

        expect(model.get()).not.toEqual([0]);
        expect(callback).toBeCalledTimes(1);
      });
    });
  });
});
