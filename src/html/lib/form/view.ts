import type { View } from "./types";
import { Button } from "./controller.js";

class ViewImpl implements View {
  private plusButton: HTMLButtonElement = document.querySelector(
    ".form__control_plus"
  )!;

  private container: HTMLDivElement = document.querySelector(".form__fields")!;
  private minusButton: HTMLButtonElement = document.querySelector(
    ".form__control_minus"
  )!;
  // private formButton: HTMLButtonElement =
  //   document.querySelector(".form__button")!;

  private defineButton(button: Button): HTMLButtonElement {
    return button === Button.Minus ? this.minusButton : this.plusButton;
  }

  public insertRow(onSelect: (option: string) => void): void {
    const select = document.createElement("SELECT") as HTMLSelectElement;

    select.addEventListener("change", (e: any) => onSelect(e.target.value));

    const div = this.createRow();
    div.appendChild(select);

    this.container.appendChild(div);
  }

  toggleButtonActivity(button: Button, value: boolean) {
    this.defineButton(button).disabled = value;
  }

  public setOptions(newOptions: string[], index: number) {
    const selectCollection = document.querySelectorAll("select");
    const arrOptions = Array.from(selectCollection[index]?.options!).map(
      (option: any) => option.label
    );

    newOptions
      .map((o) => new Option(o, o))
      .forEach((o) => {
        if (!arrOptions.includes(o.value)) {
          selectCollection[index]!.add(o);
        }
      });

    arrOptions.forEach((el, i) => {
      if (!newOptions.includes(el)) {
        selectCollection[index]!.remove(i);
      }
    });
  }

  private createRow() {
    const div = document.createElement("div");
    div.classList.add("form__row");
    div.innerHTML = '<label for="parameter">Choose from the list:</label>';
    return div;
  }

  public deleteLastRow(): void {
    const rows = document.querySelectorAll(".form__row");
    const numberRows = rows.length;
    rows[numberRows - 1]?.remove();
  }

  public onClick(button: Button, cb: () => void): void {
    this.defineButton(button).addEventListener("click", (e) => {
      e.preventDefault();
      cb();
    });
  }

  public onSubmit(_: () => void): void {
    // throw new Error(`cb ${cb}`);
  }
}

export default ViewImpl;
