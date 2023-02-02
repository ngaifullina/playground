import type { Field } from "./data";

class Form {
  rootElement: HTMLElement;
  options: Field[];

  constructor(rootElement: HTMLElement, options: Field[]) {
    this.rootElement = rootElement;
    this.options = options;
  }

  toggleUsed(index: number) {
    this.options[index]!.used = !this.options[index]!.used;
  }

  insertRaw(place: Element, id: string) {
    const div = element(
      `<div class="form__raw">
          <label for="parameter">Choose from the list:</label>
          <select id="data-option" name="option">
          ${this.unusedOptions().map((el) => {
            return `<option value="job">${el.name}</option>`;
          })}           
          </select>
      </div>`
    );
    place.insertAdjacentElement("beforebegin", div as Element);
    this.toggleUsed(this.findIndex(id));

    div!.addEventListener("input", (e: any) => {
      console.log(`input id:${id} changed to:${e.target.value}`);
    });
  }

  unusedOptions() {
    return this.options.filter((el) => !el.used);
  }

  usedOptions() {
    return this.options.filter((el) => el.used);
  }

  findIndex(name: string) {
    return this.options.findIndex((el) => el.name === name);
  }

  getQuantityUnusedOptions() {
    return this.unusedOptions().length;
  }

  deleteField(name: string) {
    const collection = document.querySelectorAll(".form__raw");
    collection[collection.length - 1]!.remove();
    this.toggleUsed(this.findIndex(name));
  }

  changeFieldKey() {}

  changeFieldValue() {}
}

/**
 * @param {String} HTML representing a single element
 * @return {Element}
 */
function element(html: string) {
  var template = document.createElement("template");
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}

export default Form;
