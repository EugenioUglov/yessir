class VoiceRecognitionService {
    constructor(voiceRecognitionManager, hashHandler) {
        this.voiceRecognitionManager = voiceRecognitionManager;
        this.hashHandler = hashHandler;
    }

    #view = new VoiceRecognitionView();

    showSettings() {
        this.view.showSettings();
    }

    startRecognizing = () => {
        const that = this;
        const option = {
            callbackInterimTranscript: onInterimTranscript, 
            callbackFinalTranscript: onFinalTranscript, 
            callbackEnd: onEnd
        };

        that.#view.showProgressRecognition();

        function onInterimTranscript(interimTranscript) {
            
            that.hashHandler.setHashRequest({
                requestValue: interimTranscript, 
                isExecuteActionBlockByTitle: false
            });
        }

        function onFinalTranscript(finalTranscript) {                   
            input_field_request.style.color = 'black';
            const lastCharacterFinalTranscript = finalTranscript[finalTranscript.length - 1];

            if (lastCharacterFinalTranscript === '.') {
                finalTranscript = finalTranscript.substr(0, finalTranscript.length - 1);
            }

            that.hashHandler.setHashRequest({
                requestValue: finalTranscript,
                isExecuteActionBlockByTitle: true,
                isListenText: true
            });
        }

        function onEnd() {
            that.#onStopRecognizing();
        }

        this.voiceRecognitionManager.startRecognizing(option);
    }
    
    stopRecognizing = () => {
        this.voiceRecognitionManager.stopRecognizing();
        this.#onStopRecognizing();
    }

    setLanguge(newLanguage) {
        this.voiceRecognitionManager.setLanguge(newLanguage)
    }

    isRecognizing() {
        return this.voiceRecognitionManager.isRecognizing();
    }


    #onStopRecognizing() {
        this.#view.showStopRecognition();
    }
}