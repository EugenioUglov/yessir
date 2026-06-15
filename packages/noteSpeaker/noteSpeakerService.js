class NoteSpeakerService {
    constructor(speakerManager) {
        this.speakerManager = speakerManager;
        
        this.model = new NoteSpeakerModel();
        this.view = new NoteSpeakerView();
        
    }

    speak = () => {
        const that = this;
        // console.log('speak content', this.view.getContent());
        this.speakerManager.speak(this.view.getContent(), onEndSpeak);
        this.view.changeTextForSpeakButton('Stop');

        function onEndSpeak() {
            that.view.changeTextForSpeakButton('Listen');
        }
    }

    stopSpeak() {
        this.speakerManager.stopSpeak();
        this.view.changeTextForSpeakButton('Listen');
    }


    removeFromPage() {
        this.hideBtnSpeaker();
        this.stopSpeak();
    }

    changeTextForSpeakButton(newText) {
        this.view.changeTextForSpeakButton(newText);
    }

    setLanguage(newLanguage) {
        this.model.setLanguage(newLanguage);
    }

    showBtnSpeaker() {
        const BTN_SPEAKER = this.view.showBtnSpeaker();

        return BTN_SPEAKER;
    }

    hideBtnSpeaker() {
        this.view.hideBtnSpeaker();
    }

    bindClickBtnSpeaker = (handler) => {
        this.view.bindClickBtnSpeaker(handler);
    }

    isSpeaking() {
        return this.speakerManager.isSpeaking();
    }
}