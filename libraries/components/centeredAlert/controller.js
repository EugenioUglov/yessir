class CenteredAlertController {
    constructor({ view }) {
        this.#view = view;

        window.addEventListener('resize', () => this.#onWindowResize);
    }
    
    #view;

    show({ title, content }) {
        this.#view.show({ title, content });
    }

    #onWindowResize() {
        this.#resizeContentDialogInfo();
    }

    // Resize content in dialog info.
    #resizeContentDialogInfo() {
      let width_alert_center = $(".content").css("width");

      $(".alert_center_content").css({
        width: "250px",
      });
    }
}