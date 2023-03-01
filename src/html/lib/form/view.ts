import type { View, Direction } from "./types";

class ViewImpl implements View {
  private readonly container: HTMLDivElement;
  private readonly buttons: Record<Direction, HTMLButtonElement>;
  private readonly form: HTMLFormElement;

  constructor(root: HTMLElement) {
    this.container = root.querySelector(".form__fields")!;
    this.buttons = {
      "+": root.querySelector(".form__control_plus")!,
      "-": root.querySelector(".form__control_minus")!,
    };
    this.form = root.querySelector(".form")!;
  }

  // private formButton: HTMLButtonElement =
  //   document.querySelector(".form__button")!;

  public insertRow(onSelect: (option: string) => void): void {
    const select = document.createElement("SELECT") as HTMLSelectElement;

    select.addEventListener("change", (e: any) => {
      onSelect(e.target.value);
    });

    const div = this.createRow();
    div.appendChild(select);
    this.container.appendChild(div);
  }

  public enableButton(direction: Direction) {
    this.buttons[direction]!.disabled = false;
  }

  public disableButton(direction: Direction) {
    this.buttons[direction]!.disabled = true;
  }

  public setOptions(newOptions: string[], index: number): void {
    const select = this.container.querySelectorAll("select")[index]!;
    const selectedItem = select.options[select.selectedIndex]?.text;
    while (select.length) {
      select.remove(0);
    }

    newOptions
      .map((o) => new Option(o, o))
      .forEach((o) => {
        select.add(o);
      });
    if (selectedItem) select.value = selectedItem;
  }

  private createRow() {
    const div = document.createElement("div");
    div.classList.add("form__row");
    div.innerHTML = '<label for="parameter">Choose from the list:</label>';
    return div;
  }

  public deleteLastRow(): void {
    const rows = this.container.querySelectorAll(".form__row");
    const numberRows = rows.length;
    rows[numberRows - 1]?.remove();
  }

  public onClick(direction: Direction, cb: () => void): void {
    this.buttons[direction].addEventListener("click", (e) => {
      e.preventDefault();
      cb();
    });
  }

  public onSubmit(cb: () => void): void {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      cb();
    });
  }
}

export default ViewImpl;
