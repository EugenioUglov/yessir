class NoteSpeakerController {
    constructor(noteSpeakerService, noteController) {
        this.noteSpeakerService = noteSpeakerService;
        this.noteController = noteController;
        
        this.#bindViewEvents();
    }


    #onClickBtnSpeaker = () => {
        if (this.noteSpeakerService.isSpeaking()) {
            this.noteSpeakerService.stopSpeak();
        }
        else {
            this.noteSpeakerService.speak();
        }
    }


    #bindViewEvents() {
        this.noteSpeakerService.bindClickBtnSpeaker(this.#onClickBtnSpeaker);
    }
}