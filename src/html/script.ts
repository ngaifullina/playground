import { data } from "./lib/data.js";
import Form from "./lib/form.js";

const button = document.querySelector("button")!;
const form = document.querySelector("form")!;
const modal = document.querySelector(".main_cover")!;
const formModel = new Form(form, data)!;
const plusButton = document.querySelector(".form__plus")!;
const minusButton = document.querySelector(".form__minus")!;
// const allSelect = document.querySelectorAll("select")!;
button.addEventListener("click", () => {
  if (formModel.getOptions().length >= 1) {
    formModel.insertRaw(plusButton);
  }
  modal.classList.add("visible");
});

plusButton.addEventListener("click", () => {
  if (formModel.getAvailableOptions().length) {
    formModel.insertRaw(plusButton);
  } else {
    plusButton.setAttribute("disabled", "");
  }
});

minusButton.addEventListener("click", () => {
  if (formModel.getOptions().length <= 3) {
    const rawLength = document.querySelectorAll("select").length;
    const lastRaw = document.querySelectorAll("select")[rawLength - 1];
    if (lastRaw) {
      formModel.deleteField(lastRaw?.value);
    }
  }
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
