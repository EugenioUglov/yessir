class LogsModel {
    constructor() {
        this.logs = [];
    }

    addLog(log) {
        this.logs.push(log);
    }

    getLogs() {
        return this.logs;
    }
    
    async getDataForFile() {
        const { getDateNow, getTimeNow } = await import(
            "https://cdn.jsdelivr.net/npm/@eugeniouglov/date-time-now/+esm"
        );
        
        const logs = this.getLogs();

        const dateAndTime = getDateNow() + '-' + getTimeNow();
    
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