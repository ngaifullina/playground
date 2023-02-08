import ControllerImpl from "./lib/form/controller.js";
import Model from "./lib/form/model.js";
import View from "./lib/form/view.js";
import { data } from "./lib/data.js";

const openFormButton = document.querySelector(".header__button")!;
const formPopup = document.querySelector(".main_cover")!;

openFormButton.addEventListener("click", () => {
  formPopup.classList.add("visible");

  const c = new ControllerImpl(new Model(data), new View());

  c.onSubmit((formState) => {
    console.log(`Submitted with state ${formState}`);
  });
});
