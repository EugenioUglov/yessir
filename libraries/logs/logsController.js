class LogsController {
  #fileManager;
  #textManager;

  constructor({ model, view, fileManager, dateManager}) {
    this.fileManager = fileManager;
    this.#model = model;
    this.#view = view;

    this.#fileManager;
    this.#textManager;

    this.#view.bindClickDownloadLogs( () => this.downloadLogs );
  }

  #model;
  #view;

  addLog(log) {
    this.#model.addLog(log);
  }

  getLogs() {
    return this.#model.getLogs();
  }

  downloadLogs() {
    if (this.#fileManager === undefined) {
      this.#textManager = new TextManager();
      this.#fileManager = new FileManager(this.#textManager);
    }

    const dataForFile = this.#model.getDataForFile();
    
    this.#fileManager.downloadFile(
      dataForFile.content,
      dataForFile.name,
      dataForFile.extension
    );
  }

  showContainerWithLogs() {
    this.#view.showContainerWithLogs();
  }

  showLog(log) {
    this.#view.setLogForLabelHelp(log);
  }
}
