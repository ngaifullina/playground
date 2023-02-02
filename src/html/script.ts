import Model from "./model.js";

const m = new Model("");

const input = document.querySelector("#input")!;
const display = document.querySelector("#display")!;

input.addEventListener("input", (e: any) => m.set(e.target.value));

m.onChange((newValue) => (display.innerHTML = newValue));
