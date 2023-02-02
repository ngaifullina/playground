import { data } from "./lib/data.js";
import Form from "./lib/form.js";

const button = document.querySelector("button")!;
const form = document.querySelector("form")!;
const modal = document.querySelector(".main_cover")!;
const formModel = new Form(form, data)!;
const plusButton = document.querySelector(".form__plus")!;
const minusButton = document.querySelector(".form__minus")!;

button.addEventListener("click", () => {
  if (formModel.getQuantityUnusedOptions() >= 1) {
    formModel.insertRaw(plusButton, formModel.unusedOptions()[0]!.name);
  }
  modal.classList.add("visible");
});

plusButton.addEventListener("click", () => {
  if (formModel.getQuantityUnusedOptions() >= 1) {
    formModel.insertRaw(plusButton, formModel.unusedOptions()[0]!.name);
  }
});

minusButton.addEventListener("click", () => {
  const fieldsLength = formModel.getQuantityUnusedOptions();
  const id = formModel.usedOptions()[fieldsLength - 1]!.name; //todo
  console.log(id, "id");
  formModel.deleteField(id);
});

form.addEventListener("submit", (e: any) => {
  e.preventDefault();
  //   const option = form.option.value;
  //   const optionValue = document.getElementsByName(option)[0].value;

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
