const dialogUploadCommands = {};

dialogUploadCommands.show = function(title_text) {
    $(".black_background").show();

    // .START (Set text for title)
    let dialogUploadActionBloksFromFile = {};
    dialogUploadActionBloksFromFile.elem = $("#dialog_upload_actionBloks_from_file");
    dialogUploadActionBloksFromFile.title = dialogUploadActionBloksFromFile.elem.find(".title")[0];
    dialogUploadActionBloksFromFile.title.innerText = "";
    if (title_text) dialogUploadActionBloksFromFile.title.innerText = title_text;
    // .END (Set text for title)


    if (typeof dialogUploadActionBloksFromFile.elem[0].showModal === "function") {
        dialogUploadActionBloksFromFile.elem[0].showModal();
    } else {
        alert("WARNING! The <dialog> API is not supported by this browser");
    }
}