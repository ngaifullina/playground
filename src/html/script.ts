import { open as openForm } from "./lib/form/index.js";
import { data } from "./lib/data.js";
import type { FormState } from "./lib/form/types.js";

const openFormButton = document.querySelector(".header__button")!;
const formPopup = document.querySelector(".main_cover")!;

const onSubmit = (formState: FormState) => {
  formPopup.classList.remove("visible");
  formState.forEach((el) =>
    data.find((d) => d.name === el.option)!.callback(el.value)
  );
};

openFormButton.addEventListener("click", () => {
  formPopup.classList.add("visible");

  openForm(
    document.querySelector(".popup")!,
    data.map(({ name }) => name),
    onSubmit
  );
});
