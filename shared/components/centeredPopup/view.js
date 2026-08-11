class CenteredPopupView {
    constructor({ domContainer }) {
        this.#domContainer = domContainer;
    }

    #domContainer;

    show({ title, content }) {
        let dialogUploadActionBloksFromFile = {};
        dialogUploadActionBloksFromFile.elem = this.#domContainer.querySelector("#dialog_upload_actionBloks_from_file");
        dialogUploadActionBloksFromFile.title = this.#domContainer.querySelector(".title");
        dialogUploadActionBloksFromFile.title.innerText = "";

        if (title) dialogUploadActionBloksFromFile.title.innerText = title;

        if (content) dialogUploadActionBloksFromFile.elem.querySelector('.content').innerText = content;


        if (typeof dialogUploadActionBloksFromFile.elem.showModal === "function") {
            dialogUploadActionBloksFromFile.elem.showModal();
        } else {
            alert("WARNING! The <dialog> API is not supported by this browser");
        }
    }
}