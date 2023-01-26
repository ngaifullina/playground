const button = document.querySelector("button");
const form = document.querySelector("form");
const userName = document.querySelector("#nameToChange");
const userJob = document.querySelector("#jobToChange");
const inputName = document.querySelector("#name");
const inputJob = document.querySelector("#job");
const modal = document.querySelector(".main_cover");

button.addEventListener("click", () => {
  console.log("in click");
  modal.classList.add("visible");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  userName.textContent = inputName.value;
  userJob.textContent = inputJob.value;
  modal.classList.remove("visible");
});
