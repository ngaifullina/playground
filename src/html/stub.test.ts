test("stub", () => {
  const STR = "0";
  const callback = (_: string) => {
    /* do stuff */
  };
  const callbackStub = jest.fn(callback);
  callbackStub(STR);
  expect(callbackStub).toHaveBeenCalledWith(STR);
});
