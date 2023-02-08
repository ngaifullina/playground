class View {
  private button = document.querySelector(".header__button")!;
  private popup = document.querySelector(".main_cover")!;

  constructor() {
    this.button.addEventListener("click", () => {
      this.popup.classList.add("visible");
    });
    // todo all event listeners here
  }

  // EXAMPLE
  // public updateSelectOptions(position: number, newOptions: string[])
  // public addOptionToSelect(position: number, newOption: string)
}

export default View;
