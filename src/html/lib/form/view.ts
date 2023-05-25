import type { View, Direction, CloseFn } from "./types";

const FORM_ROW = ".form__row";
const FORM_FIELDS = ".form__fields";
const FORM_CONTROL_PLUS = ".form__control_plus";
const FORM_CONTROL_MINUS = ".form__control_minus";
const ERROR_MSG = ".error";

type Listener = (e: any) => void;

type ButtonEntry = {
  button: HTMLButtonElement;
  callbacks: Listener[];
};

export class ViewImpl implements View {
  private readonly container: HTMLDivElement;
  private readonly form: HTMLFormElement;
  private readonly buttons: Record<Direction, ButtonEntry>;

  public static create(root: HTMLElement): [View, CloseFn] {
    if (root.querySelector(FORM_ROW)) {
      throw new Error("Failed to create View(root): root is not empty");
    }

    const v = new ViewImpl(root);

    return [
      v,
      () => {
        root.querySelector(FORM_FIELDS)!.innerHTML = "";
        v.close();
      },
    ];
  }

  private constructor(root: HTMLElement) {
    this.container = root.querySelector(FORM_FIELDS)!;
    this.buttons = {
      "+": {
        button: root.querySelector(FORM_CONTROL_PLUS)!,
        callbacks: [],
      },
      "-": {
        button: root.querySelector(FORM_CONTROL_MINUS)!,
        callbacks: [],
      },
    };
    this.form = root.querySelector(".form")!;
  }

  public insertRow(
    onSelect: (option: string) => void,
    onInputChange: (value: string) => void
  ): void {
    const select = document.createElement("SELECT") as HTMLSelectElement;
    const input = document.createElement("INPUT") as HTMLInputElement;
    const innerDiv = document.createElement("DIV") as HTMLDivElement;
    input.setAttribute("type", "text");

    select.addEventListener("change", (e: any) => onSelect(e.target.value));
    input.addEventListener("change", (e: any) => onInputChange(e.target.value));

    innerDiv.append(select, input);
    const div = this.createRow();
    div.appendChild(innerDiv);
    this.container.appendChild(div);
  }

  public enableButton(direction: Direction) {
    this.buttons[direction]!.button.disabled = false;
  }

  public disableButton(direction: Direction) {
    this.buttons[direction]!.button.disabled = true;
  }

  public setAvailableOptions(availableOptions: string[], index: number): void {
    const select = this.getSelect(index);
    if (!select) return;
    const selected = select?.value;
    while (select.length) {
      select.remove(0);
    }

    availableOptions
      .map((o) => new Option(o, o))
      .forEach((o) => {
        select.add(o);
      });

    if (selected && availableOptions.includes(selected)) {
      select.value = selected;
    }
  }

  public setSelectedOption(option: string, index: number): void {
    const select = this.getSelect(index);
    // console.log(select, option);
    select.value = option;
    // console.log("after select option", select, select.value);
  }

  public setValue(value: string, index: number) {
    const input = this.container.querySelectorAll("input")[index]!;
    input.value = value;
  }

  public deleteLastRow(): void {
    const rows = this.container.querySelectorAll(FORM_ROW);
    const numberRows = rows.length;
    rows[numberRows - 1]?.remove();
  }

  public onClick(direction: Direction, cb: () => void): void {
    const fn = (e: any) => {
      e.preventDefault();
      cb();
    };

    const { button, callbacks } = this.buttons[direction];

    callbacks.push(fn);
    button.addEventListener("click", fn);
  }

  public onSubmit(cb: () => void): void {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      cb();
    });
  }

  public showError() {
    document.querySelector(ERROR_MSG)?.classList.add("visible");
  }

  public close(): void {
    document.querySelector(ERROR_MSG)?.classList.remove("visible");

    Object.values(this.buttons).forEach(({ button, callbacks }) =>
      callbacks.forEach((cb) => {
        button.removeEventListener("click", cb);
      })
    );
  }

  private createRow(): HTMLDivElement {
    const div = document.createElement("div");
    div.classList.add("form__row");
    div.innerHTML = '<label for="parameter">Choose from the list:</label>';
    return div;
  }

  private getSelect(index: number): HTMLSelectElement {
    return this.container.querySelectorAll("select")[index]!;
  }
}
