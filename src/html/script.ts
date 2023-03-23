import { open as openForm } from "./lib/form/index.js";
import { data } from "./lib/data.js";
import type { FormState } from "./lib/form/types.js";

const openFormButton = document.querySelector(".header__button")!;
const formPopup = document.querySelector(".main_cover")!;
const header = document.querySelector(".header__content")!;
const text = document.createElement("div") as HTMLDivElement;

const onSubmit = (formState: FormState) => {
  formPopup.classList.remove("visible");
  text.innerText = formState.reduce(
    (acc: string, current) => acc + " " + current.option,
    " "
  );
  header.insertBefore(text, openFormButton);
};

openFormButton.addEventListener("click", () => {
  formPopup.classList.add("visible");

  openForm(
    document.querySelector(".popup")!,
    data.map(({ name }) => name),
    onSubmit
  );
});
