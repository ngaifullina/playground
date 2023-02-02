import Model from "./model.js";

class Form {
  rootElement: HTMLElement;
  options: string[];

  constructor(rootElement: HTMLElement, options: string[]) {
    this.rootElement = rootElement;
    this.options = options;
  }

  toggleUsed(index) {
    this.options[index].used = !this.options[index].used;
  }

  insertRaw(place, id) {
    const div = element(
      `<div class="form__raw">
          <label for="parameter">Choose from the list:</label>
          <select id="data-option" name="option">
          ${this.unusedOptions().map((el) => {
            return `<option value="job">${el.id}</option>`;
          })}           
          </select>
      </div>`
    );
    place.insertAdjacentElement("beforebegin", div);
    this.toggleUsed(this.findIndex(id));

    div.addEventListener("input", (e) => {
      console.log(`input id:${id} changed to:${e.target.value}`);
    });
  }

  unusedOptions() {
    return this.options.filter((el) => !el.used);
  }

  usedOptions() {
    return this.options.filter((el) => el.used);
  }

  findIndex(id) {
    return this.options.findIndex((el) => el.id === id);
  }

  getQuantityUnusedOptions() {
    return this.unusedOptions().length;
  }

  deleteField(id) {
    console.log(id, "id");
    const collection = document.querySelectorAll(".form__raw");
    collection[collection.length - 1].remove();
    this.toggleUsed(this.findIndex(id));
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
const formModel = new Form(form, data);
const plusButton = document.querySelector(".form__plus");
const minusButton = document.querySelector(".form__minus");

button.addEventListener("click", () => {
  if (formModel.getQuantityUnusedOptions() >= 1) {
    formModel.insertRaw(plusButton, formModel.unusedOptions()[0].id);
  }
  modal.classList.add("visible");
});

plusButton.addEventListener("click", () => {
  if (formModel.getQuantityUnusedOptions() >= 1) {
    formModel.insertRaw(plusButton, formModel.unusedOptions()[0].id);
  }
});

minusButton.addEventListener("click", () => {
  const fieldsLength = formModel.getQuantityUnusedOptions();
  const id = formModel.usedOptions()[fieldsLength - 1].id; //todo
  console.log(id, "id");
  formModel.deleteField(id);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const option = form.option.value;
  const optionValue = document.getElementsByName(option)[0].value;

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
