class LogsService {
    constructor(fileManager, dateManager) {
        this.fileManager = fileManager;

        this.model = new LogsModel(dateManager);
        this.view = new LogsView();
    }


    addLog(log) {
        this.model.addLog(log);
    }

    getLogs() {
        return this.model.getLogs();
    }

    downloadLogs() {
        const dataForFile = this.model.getDataForFile();
        this.fileManager.downloadFile(dataForFile.content, dataForFile.name, dataForFile.extension);
    }

    showContainerWithLogs() {
        this.view.showContainerWithLogs();
    }

    showLog(log) {
        this.view.setLogForLabelHelp(log);
    }

    showContainerWithLogs() {
        this.view.showContainerWithLogs();
    }
}