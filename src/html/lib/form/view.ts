import type { View } from "./types";

class ViewImpl implements View {
  private plusButton: HTMLButtonElement = document.querySelector(
    ".form__control_plus"
  )!;

  private container: HTMLDivElement = document.querySelector(".form__fields")!;

  // private minusButton: HTMLButtonElement =
  //   document.querySelector(".form__minus")!;
  // private formButton: HTMLButtonElement =
  //   document.querySelector(".form__button")!;

  public insertRow(
    options: string[],
    onSelect: (newValue: string) => void
  ): void {
    const select = document.createElement("SELECT") as HTMLSelectElement;

    // todo type e
    select.addEventListener("select", (e: any) => onSelect(e.target.value));

    options.map((o) => new Option(o, o)).forEach((o) => select.add(o));

    const div = document.createElement("div");
    div.classList.add("form__raw");
    div.innerHTML = '<label for="parameter">Choose from the list:</label>';
    div.appendChild(select);

    this.container.appendChild(div);
  }

  public deleteLastRow(): void {
    throw new Error("Method not implemented.");
  }

  public updateOptions(position: number, newOptions: string[]): void {
    throw new Error(`${position} ${newOptions}`);
  }

  public onPlusClick(cb: () => void): void {
    // console.log(this.plusButton);
    this.plusButton.addEventListener("click", (e) => {
      e.preventDefault();
      cb();
    });
  }

  public onMinusClick(cb: () => void): void {
    throw new Error(`cb ${cb}`);
  }

  public onSubmit(_: () => void): void {
    // throw new Error(`cb ${cb}`);
  }

  // EXAMPLE
  // public updateSelectOptions(position: number, newOptions: string[])
  // public addOptionToSelect(position: number, newOption: string)
}

export default ViewImpl;
