const button = document.querySelector("button");
const form = document.querySelector("form");
const userName = document.querySelector("#nameToChange");
const userJob = document.querySelector("#jobToChange");
const inputName = document.querySelector("#name");
const inputJob = document.querySelector("#job");
const pageCover = document.querySelector(".main_cover");
const modal = document.querySelector(".main__form");
console.log(button, pageCover, modal);

button.addEventListener("click", () => {
  console.log("in click");
  // pageCover.classList.add("opacity");
  modal.classList.add("visible");

  modalWindow.classList.add("visible");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  userName.textContent = inputName.value;
  userJob.textContent = inputJob.value;
  modalWindow.classList.remove("visible");
});
