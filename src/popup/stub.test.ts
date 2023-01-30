test("stub", () => {
  const STR = "0";
  const callback = jest.fn((_: string) => {});

  callback(STR);

  expect(callback).toHaveBeenCalledWith(STR);
});
