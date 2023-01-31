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
class Form {
  // TODO;

  // TODO initial arguments
  constructor(rootElement) {
    // todo this.model = new Model()
    this.rootElement = rootElement;
  }

  // todo arguments
  addField(id) {
    const div = element(
      `<div class="form__raw">
        <input type="text" id=${id}/>
        <label>${id}</label>
      </div>`
    );

    div.addEventListener("input", (e) => {
      console.log(`input id:${id} changed to:${e.target.value}`);
    });

    plusButton.insertAdjacentElement("beforebegin", div);
  }

  deleteField() {
    const collection = document.querySelectorAll(".form__raw");
    collection[collection.length - 1].remove();
  }

  changeFieldKey() {}

  changeFieldValue() {}
}

/**
 * @param {String} HTML representing a single element
 * @return {Element}
 */
function element(html) {
  var template = document.createElement("template");
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}

const button = document.querySelector("button");
const form = document.querySelector("form");
const modal = document.querySelector(".main_cover");
const formModel = new Form(form);
const plusButton = document.querySelector(".form__plus");
const minusButton = document.querySelector(".form__minus");

const data = [
  {
    id: "Name",
    model: new Model({ option: "", optionValue: "" }),
    callback: (newValue) =>
      (document.querySelector("#nameToChange").textContent = newValue),
  },
  // {
  //   id: "#job",
  //   model: new Model(""),
  //   callback: (newValue) =>
  //     (document.querySelector("#jobToChange").textContent = newValue),
  // },
];

button.addEventListener("click", () => {
  modal.classList.add("visible");
});

plusButton.addEventListener("click", () => formModel.addField("Job"));
minusButton.addEventListener("click", () => formModel.deleteField());

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const option = form.option.value;
  const optionValue = document.getElementsByName(option)[0].value;
  console.log(option, "option");

  // data
  //   .filter((el) => document.querySelector(`#${el.id}`).value)
  //   .forEach((el) => {
  //     el.model.onChange(el.callback);
  //     el.model.set(document.querySelector(`#${el.id}`).value);
  //   });

  modal.classList.remove("visible");
  form.reset();
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("visible");
  }
});
