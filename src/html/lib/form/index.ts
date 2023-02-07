import type { Field } from "../data.js";
import Model from "../model.js";
import FormView from "./view.js";

class FormController {
  private selectedOptions: Model<Set<string>>;
  private plusButton: HTMLButtonElement;

  constructor(
    private rootElement: HTMLElement,
    private options: Field[],
    private onSubmit: (formState: any) => void
  ) {
    this.selectedOptions = new Model(new Set());
    this.plusButton = document.querySelector(".form__plus")!;

    this.view = new FormView(...);

    // todo all event listeners here

    this.form.addEventListener("submit", (e: any) => {
      e.preventDefault();
      throw 'todo';
      // onSubmit();

      //   const option = form.option.value;
      //   const optionValue = document.getElementsByName(option)[0].value;

      // data
      //   .filter((el) => document.querySelector(`#${el.id}`).value)
      //   .forEach((el) => {
      //     el.model.onChange(el.callback);
      //     el.model.set(document.querySelector(`#${el.id}`).value);
      //   });

      // modal.classList.remove("visible");
      form.reset();
    });
  }

  private getAvailableOptions() {
    return this.options
      .map((el) => el.name)
      .filter((el) => !this.selectedOptions.get().has(el));
  }

  private getOptions() {
    return Array.from(this.selectedOptions.get());
  }

  private deselectOption(name: string) {
    this.selectedOptions.get().delete(name);
    this.selectedOptions.trigger();
  }

  private selectOption(name: string) {
    this.selectedOptions.get().add(name);
    this.selectedOptions.trigger();

    this.view.insertRow("job");
  }

  private insertOptions(): HTMLSelectElement {
    const select = document.createElement("SELECT") as HTMLSelectElement;

    const availableOptions = this.getAvailableOptions();

    availableOptions.map((o) => new Option(o, o)).forEach((o) => select.add(o));

    this.selectOption(availableOptions[0]!);

    return select;
  }

  private updateOptions(select: HTMLSelectElement) {
    for (let option of select) {
      if (
        this.selectedOptions.get().has(option.label) &&
        option.index !== select.selectedIndex
      ) {
        select.remove(option.index);
      }
    }

    // console.log(this.selectedOptions, "selectedOptions");
    this.selectedOptions.onChange((newAvailableOptions) => {
      console.log(newAvailableOptions, "newAvailableOptions");
    });
  }

  private insertRaw(place: any) {
    const select = this.insertOptions();
    const div = document.createElement("div");
    div.classList.add("form__raw");
    div.innerHTML = '<label for="parameter">Choose from the list:</label>';
    div.appendChild(select);

    place.before(div);

    select!.addEventListener("click", (e: any) => {
      // console.log(e);
      this.updateOptions(select);
      // this.addOption(name);
      // this.deleteOption(e.target.value);
      // console.log(`selected ${e.target.value}`);
    });
  }

  private deleteField(name: string) {
    const collection = document.querySelectorAll(".form__raw");
    this.selectOption(name);
    collection[collection.length - 1]!.remove();
  }

  private changeFieldKey() {}

  private changeFieldValue() {}
}

export default FormController;
