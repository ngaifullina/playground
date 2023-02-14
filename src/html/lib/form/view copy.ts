// import type { Field } from "../data.js";
// import ReduxModel from "../model.js";

// const button = document.querySelector(".header__button")!;
// const form = document.querySelector("form")!;
// const modal = document.querySelector(".main_cover")!;
// const plusButton = document.querySelector(".form__plus")!;
// const minusButton = document.querySelector(".form__minus")!;

// button.addEventListener("click", () => {
//   formModel.insertRaw(plusButton);
//   modal.classList.add("visible");
// });

// plusButton.addEventListener("click", () => {
//   if (formModel.getAvailableOptions().length > 1) {
//     formModel.insertRaw(plusButton);
//   } else if (formModel.getAvailableOptions().length === 1) {
//     plusButton.setAttribute("disabled", "");
//     formModel.insertRaw(plusButton);
//   }
// });

// minusButton.addEventListener("click", () => {
//   if (formModel.getOptions().length <= 3) {
//     const rawLength = document.querySelectorAll("select").length;
//     const lastRaw = document.querySelectorAll("select")[rawLength - 1];
//     if (lastRaw) {
//       formModel.deleteField(lastRaw?.value);
//     }
//   }
// });

// form.addEventListener("submit", (e: any) => {
//   e.preventDefault();
//   //   const option = form.option.value;
//   //   const optionValue = document.getElementsByName(option)[0].value;

//   // data
//   //   .filter((el) => document.querySelector(`#${el.id}`).value)
//   //   .forEach((el) => {
//   //     el.model.onChange(el.callback);
//   //     el.model.set(document.querySelector(`#${el.id}`).value);
//   //   });

//   // modal.classList.remove("visible");
//   form.reset();
// });

// modal.addEventListener("click", (e) => {
//   if (e.target === modal) {
//     modal.classList.remove("visible");
//   }
// });

// class FormView {
//   // private selectedOptions: Model<Set<string>>;
//   // private plusButton: HTMLButtonElement;

//   constructor(
//     private rootElement: HTMLElement,
//     private onSubmit: (hintFormState: any) => void
//   ) {
//     this.selectedOptions = new ReduxModel(new Set());
//     this.plusButton = document.querySelector(".form__plus")!;

//     // todo all event listeners here

//     this.form.addEventListener("submit", (e: any) => {
//       e.preventDefault();
//       onSubmit();

//       //   const option = form.option.value;
//       //   const optionValue = document.getElementsByName(option)[0].value;

//       // data
//       //   .filter((el) => document.querySelector(`#${el.id}`).value)
//       //   .forEach((el) => {
//       //     el.model.onChange(el.callback);
//       //     el.model.set(document.querySelector(`#${el.id}`).value);
//       //   });

//       // modal.classList.remove("visible");
//       form.reset();
//     });
//   }

//   // EXAMPLE
//   // public updateSelectOptions(position: number, newOptions: string[])
//   // public addOptionToSelect(position: number, newOption: string)

//   private createSelect(
//     options: string[],
//     onSelect: (selectedOption: string) => {}
//   ): HTMLSelectElement {
//     const select = document.createElement("SELECT") as HTMLSelectElement;
//     // todo is it needed?
//     select.addEventListener("select", (e: any) => onSelect(e.target.value));
//     options.map((o) => new Option(o, o)).forEach((o) => select.add(o));
//     return select;
//   }

//   private updateOptions(select: HTMLSelectElement) {
//     for (let option of select) {
//       if (
//         this.selectedOptions.get().has(option.label) &&
//         option.index !== select.selectedIndex
//       ) {
//         select.remove(option.index);
//       }
//     }

//     // console.log(this.selectedOptions, "selectedOptions");
//     this.selectedOptions.onChange((newAvailableOptions) => {
//       console.log(newAvailableOptions, "newAvailableOptions");
//     });
//   }

//   public insertRow(place: any): void {
//     const select = this.insertOptions();
//     const div = document.createElement("div");
//     div.classList.add("form__raw");
//     div.innerHTML = '<label for="parameter">Choose from the list:</label>';

//     div.appendChild(select);

//     place.before(div);

//     select!.addEventListener("click", (e: any) => {
//       // console.log(e);
//       this.updateOptions(select);
//       // this.addOption(name);
//       // this.deleteOption(e.target.value);
//       // console.log(`selected ${e.target.value}`);
//     });
//   }

//   private deleteField(name: string) {
//     const collection = document.querySelectorAll(".form__raw");
//     this.selectOption(name);
//     collection[collection.length - 1]!.remove();
//   }

//   private changeFieldKey() {}

//   private changeFieldValue() {}
// }

// export default FormView;
