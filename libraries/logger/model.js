class LogsModel {
    #dateManager;

    constructor(dateManager) {
        this.#dateManager = dateManager;
        this.logs = [];
    }

    addLog(log) {
        this.logs.push(log);
    }

    getLogs() {
        return this.logs;
    }
    
    getDataForFile() {
        const logs = this.getLogs();

        const dateAndTime = this.#dateManager.getDateNow() + '-' + this.#dateManager.getTimeNow();
    
        // Set variable for name of the saving file with date and time. 
        const fileName = 'Logs_yesSir ' + dateAndTime;
        const extension = '.txt';

        let content = '';

        for (const i in logs) {
            const log = logs[i];
            const numberLog = parseInt(i) + 1;

            if (i > 0) content += '\n';

            content += numberLog + '. ' + log;
        }

        const dataForFile = {
            content: content,
            name: fileName,
            extension: extension
        };

        return dataForFile;
    }
}