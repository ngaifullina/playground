import type { View, Direction, CloseFn } from "./types";

// todo inheritance solution
// todo: separate classes solution
// todo function solution

const FORM_ROW = ".form__row";
const FORM_FIELDS = ".form__fields";
const FORM_CONTROL_PLUS = ".form__control_plus";
const FORM_CONTROL_MINUS = ".form__control_minus";

// class solution
// class ViewLifecycle implements Lifecycle {
//   constructor(private root: HTMLElement) {}

//   public close(): void {
//     this.root.querySelector(FORM_FIELDS)!.innerHTML = "";
//   }
// }

// // function solution
// function viewLifecycle(root: HTMLElement): Lifecycle {
//   return {
//     close: () => {
//       root.querySelector(FORM_FIELDS)!.innerHTML = "";
//     },
//   };
// }

export class ViewImpl implements View {
  private readonly container: HTMLDivElement;
  private readonly buttons: Record<Direction, HTMLButtonElement>;
  private readonly form: HTMLFormElement;

  public static create(root: HTMLElement): [View, CloseFn] {
    if (root.querySelector(FORM_ROW)) {
      throw new Error("Failed to create View(root): root is not empty");
    }

    return [
      new ViewImpl(root),
      () => (root.querySelector(FORM_FIELDS)!.innerHTML = ""),
    ];
  }

  private constructor(root: HTMLElement) {
    this.container = root.querySelector(FORM_FIELDS)!;
    this.buttons = {
      "+": root.querySelector(FORM_CONTROL_PLUS)!,
      "-": root.querySelector(FORM_CONTROL_MINUS)!,
    };
    this.form = root.querySelector(".form")!;
  }

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

    while (select.length) {
      select.remove(0);
    }

    newOptions
      .map((o) => new Option(o, o))
      .forEach((o) => {
        select.add(o);
      });
    select.value = select.options[select.selectedIndex]?.text || "";
  }

  private createRow() {
    const div = document.createElement("div");
    div.classList.add("form__row");
    div.innerHTML = '<label for="parameter">Choose from the list:</label>';
    return div;
  }

  public deleteLastRow(): void {
    const rows = this.container.querySelectorAll(FORM_ROW);
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
