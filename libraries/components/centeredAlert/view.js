class CenteredAlertView {
    constructor({ domContainer }) {
        this.#domContainer = domContainer;
    }

    #domContainer;

    show({ title, content }) {
        let dialogInfoElem = this.#domContainer.find("#alert_center");
        this.#domContainer.find(".black_background").show();
        
        if (typeof dialogInfoElem[0].showModal === "function") {
            dialogInfoElem[0].showModal();

            if (title) {
                // Set title.
                dialogInfoElem.find(".title")[0].innerText = title;
            }

            // Set content.
            dialogInfoElem.find(".text_info")[0].innerText = content;
        } else {
            alert(content);
            // console.log('WARNING! The <dialog> API is not supported by this browser');
        }
    }
}