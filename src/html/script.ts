import { open as openForm } from "./lib/form/index.js";
import { data } from "./lib/data.js";
import type { FormState } from "./lib/form/types.js";

const openFormButton = document.querySelector(".header__button")!;
const mainCover = document.querySelector(".main_cover")!;
const closeFormButton = document.querySelector(".close")!;

// let closeForm: () => void = () => {};

const onSubmit = (formState: FormState) => {
  console.log(formState, "formState");
  mainCover.classList.remove("visible");
  formState.forEach((el) =>
    data.find((d) => d.name === el.option)!.callback(el.value)
  );
  // closeForm();
};

//

openFormButton.addEventListener("click", () => {
  mainCover.classList.add("visible");
  // closeForm();
  openForm(
    document.querySelector(".popup")!,
    data.map(({ name }) => name),
    onSubmit
  );
  // const closeFormWithSubmit = () =>
  //   openForm(
  //     document.querySelector(".popup")!,
  //     data.map(({ name }) => name),
  //     onSubmit
  //   );
  // closeForm = openForm(
  //   document.querySelector(".popup")!,
  //   data.map(({ name }) => name),
  //   onSubmit
  // );
  // closeForm = closeFormWithSubmit;
});

// todo abstract away popup
/*
<div class="popup">
  <div class="popup__overlay"></div>
  <div class="popup__body">
    <div class="popup__close"></div>
  </div>
</div>
*/

mainCover.addEventListener("click", ({ target }) => {
  const clickedOutsidePopup = !(target as HTMLElement).closest(".popup");
  const clickedOnCloseFormButton = target === closeFormButton;

  if (clickedOutsidePopup || clickedOnCloseFormButton) {
    console.log("outside");
    mainCover.classList.remove("visible");
    // closeForm();
  }
});
