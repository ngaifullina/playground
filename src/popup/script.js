class Model {
  state;
  callback;

  constructor(initial) {
    this.state = initial;
    this.callback = (_) => {};
  }

  get() {
    return this.state;
  }

  set(newValue) {
    if (this.state !== newValue) {
      this.callback(newValue);
    }
    this.state = newValue;
  }

  onChange(callback) {
    this.callback = callback;
  }
}
const button = document.querySelector("button");
const form = document.querySelector("form");
const modal = document.querySelector(".main_cover");

const data = [
  {
    id: "#name",
    model: new Model(""),
    callback: (newValue) =>
      (document.querySelector("#nameToChange").textContent = newValue),
  },
  {
    id: "#job",
    model: new Model(""),
    callback: (newValue) =>
      (document.querySelector("#jobToChange").textContent = newValue),
  },
];

button.addEventListener("click", () => {
  modal.classList.add("visible");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  data
    .filter((el) => document.querySelector(el.id).value)
    .forEach((el) => {
      el.model.onChange(el.callback);
      el.model.set(document.querySelector(el.id).value);
    });

  modal.classList.remove("visible");
  form.reset();
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("visible");
  }
});
