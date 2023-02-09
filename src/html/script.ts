import { open as openForm } from "./lib/form/index.js";
import { data } from "./lib/data.js";
import type { FormState } from "./lib/form/types.js";

const openFormButton = document.querySelector(".header__button")!;
const formPopup = document.querySelector(".main_cover")!;

openFormButton.addEventListener("click", () => {
  formPopup.classList.add("visible");
  openForm(
    data.map(({ name }) => name),
    (formState: FormState) => {
      console.log(`Submitted with state ${formState}. TODO update 'data'`);
    }
  );
});
