class CenteredAlertView {
    show({ title, content }) {
        let dialogInfoElem = $("#alert_center");
        $(".black_background").show();
        // Hide search area with Action-Blocks.

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