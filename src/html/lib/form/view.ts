import type { View } from "./types";

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

  public insertRow(onSelect: (option: string) => void): void {
    const select = document.createElement("SELECT") as HTMLSelectElement;

    select.addEventListener("change", (e: any) => onSelect(e.target.value));

    const div = this.createRow();
    div.appendChild(select);

    this.container.appendChild(div);
  }

  public updateOptions(newOptions: string[], index: number) {
    if (newOptions.length <= 1) {
      this.plusButton.setAttribute("disabled", "");
    } else {
      this.plusButton.removeAttribute("disabled");
    }

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

  public onPlusClick(cb: () => void): void {
    this.plusButton.addEventListener("click", (e) => {
      e.preventDefault();
      cb();
    });
  }
  public onMinusClick(cb: () => void): void {
    this.minusButton.addEventListener("click", (e) => {
      e.preventDefault();
      cb();
    });
  }

  public onSubmit(_: () => void): void {
    // throw new Error(`cb ${cb}`);
  }
}

export default ViewImpl;
