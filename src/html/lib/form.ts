import type { Field } from "./data.js";
import Model from "./model.js";

class Form {
  rootElement: HTMLElement;
  selectedOptions: Model<Set<string>>;
  totalOptions: Field[];

  constructor(rootElement: HTMLElement, totalOptions: Field[]) {
    this.rootElement = rootElement;
    this.totalOptions = totalOptions;
    this.selectedOptions = new Model(new Set());
  }

  getAvailableOptions() {
    console.log(
      this.totalOptions
        .map((el) => el.name)
        .filter((el) => !this.selectedOptions.get().has(el))
    );
    return this.totalOptions
      .map((el) => el.name)
      .filter((el) => !this.selectedOptions.get().has(el));
  }

  getOptions() {
    return Array.from(this.selectedOptions.get());
  }

  deleteOption(name: string) {
    this.selectedOptions.get().delete(name);
    this.selectedOptions.trigger();
  }

  addOption(name: string) {
    this.selectedOptions.get().add(name);
    this.selectedOptions.trigger();
  }

  insertOptions() {}

  insertRaw(place: Element) {
    const div = element(
      `<div class="form__raw">
          <label for="parameter">Choose from the list:</label>
          <select id="data-option" name="option">
         ${this.getAvailableOptions().map((optionName) => {
           return `<option value=${optionName}>${optionName}</option>`;
         })}           
          </select>
      </div>`
    );
    this.addOption(this.getAvailableOptions()[0]!);

    place.insertAdjacentElement("beforebegin", div as Element);

    this.selectedOptions.onChange((newAvailableOptions) => {
      console.log(newAvailableOptions, "newAvailableOptions");
      // todo put newAvailableOptions into options
    });
    // div!.addEventListener("input", (e: any) => {
    //   console.log(e);
    //   this.addOption(name);
    //   this.deleteOption(e.target.value);
    //   console.log(this.availableOptions.get());
    //   console.log(`input id:${name} changed to:${e.target.value}`);
    // });
  }

  deleteField(name: string) {
    const collection = document.querySelectorAll(".form__raw");
    this.addOption(name);
    collection[collection.length - 1]!.remove();
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
