class NoteService {
  constructor(noteSpeakerService, hashService) {
    this.noteSpeakerService = noteSpeakerService;
    this.hashService = hashService;
    this.view = new NoteView();
    
    this.closeHandler;
  }

  openNote(content, title, isHTML) {
    const that = this;

    const elements_to_show = this.view.showInfo(content, title, isHTML);

    elements_to_show.forEach((element_to_show) => {
      that.hashService.showElement(element_to_show);
    });

    if (isHTML === false) {
      const BTN_SPEAKER = this.noteSpeakerService.showBtnSpeaker();

      this.hashService.showElement(BTN_SPEAKER);
    }

    if (window.location.hash.includes("&listen")) {
      this.noteSpeakerService.speak();
    }

    // showCommandInput();
  }

  close = () => {
    $('.inputFieldWithSuggestions').hide();
    yesSir.voiceRecognitionService.stopRecognizing();
    this.noteSpeakerService.removeFromPage();
    this.view.close();
  };

  bindClickBtnClose(handler) {
    this.closeHandler = handler;
    this.view.bindClickBtnClose(handler);
  }
}
