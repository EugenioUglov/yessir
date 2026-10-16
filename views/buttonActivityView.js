class ButtonActivityView {
    enableAllButtons() {
        $(":submit, :button").attr("disabled", false);
    }

    disableAllButtons() {
        $(":submit, :button").attr("disabled", "disabled");
    }
}