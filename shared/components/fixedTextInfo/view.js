class FixedTextInfoView {
    constructor({ domElement }) {
        console.log(domElement);
        this.#domElement = domElement;
    }

    #domElement;

    show({ text }) {
        this.#setTextForFixedTextInfo({ text });

        console.log(this.#domElement)
        console.log($(this.#domElement))
        $(this.#domElement).find(".fixed-text-info-container").show();
        $(this.#domElement).find(".gray-foreground").show();
    }

    hide() {
        $(this.#domElement).find(".fixed-text-info-container").hide();
        $(this.#domElement).find(".gray-foreground").hide();
        $(this.#domElement).find(".fixed-text-info").text("");
    }

    #setTextForFixedTextInfo({ text }) {
      let fixedTextInfo = $(".fixed-text-info").text(text);
      const topFixedInfoContainerHeight = 100;

      fixedTextInfo.html(fixedTextInfo.html().replace(/\n/g, "<br/>"));

      $(".fixed-text-info").css(
        "margin-top",
        topFixedInfoContainerHeight / 2
      );
    }
}