class LogsView {
    constructor({ container }) {
        this.setListener();

        this.#container = container;
    }

    #container;
    #onClickDownloadLogs;

    setLogForLabelHelp(log) {
        label_help.innerText = log;
    }

    showContainerWithLogs() {
        $('#elements_for_logs').show();
    }

    setListener() {
        const that = this;

        $('#btn_download_logs').on('click', () => this.#onClickDownloadLogs());
    }
    
    // Show log with red text.
    showErrorLog() {
        this.#container.innerHTML += '<div style="color:#e85894;">' + '* ERROR! ' + text + '</div><br><br>';
    }

    // Show log with grey text.
    addWarningLog() {
        this.#container.innerHTML += '<div style="color:#A36A00;">' + '* Warning! ' + text + '</div><br><br>';
    }

    clear() {
        this.#container.innerHTML = '';
    }

    bindClickDownloadLogs(handler) {
        this.#onClickDownloadLogs = handler();
    }
}