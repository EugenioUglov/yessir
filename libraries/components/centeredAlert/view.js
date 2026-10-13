class CenteredAlertView {
    constructor({ domContainer }) {
        this.#domContainer = domContainer;
    }

    #domContainer;

    show({ title, content }) {
        console.log(this.#domContainer);
        let dialogInfoElem = this.#domContainer.querySelector("#alert_center");
        
        if (dialogInfoElem && typeof dialogInfoElem.showModal === "function") {
            dialogInfoElem.showModal();

            if (title) {
                // Set title.
                dialogInfoElem.querySelector(".title").innerText = title;
            }

            // Set content.
            dialogInfoElem.querySelector(".text_info").innerText = content;
        } else {
            alert(content);
            // console.log('WARNING! The <dialog> API is not supported by this browser');
        }
    }
}