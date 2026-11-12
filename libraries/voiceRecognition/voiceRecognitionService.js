class VoiceRecognitionService {
    constructor() {
        if (this.isBrowserSupportRecognition()) {
            // Create recognizer.
            this.#recognizer = new webkitSpeechRecognition();

            // Option for recognizing even before user stop to talk.
            this.#recognizer.interimResults = true;
        }
        else {
            console.log('Warning! Speech recognition is not supported in this browser');
        }
    }

    #view = new VoiceRecognitionView();
    #recognizer;
    #isRecognizing = false;
      #languages =
    [
        ['English',         ['en-US', 'United States'],
                            ['en-AU', 'Australia'],
                            ['en-CA', 'Canada'],
                            ['en-IN', 'India'],
                            ['en-NZ', 'New Zealand'],
                            ['en-ZA', 'South Africa'],
                            ['en-GB', 'United Kingdom']],
        ['Italiano',        ['it-IT', 'Italia'],
                            ['it-CH', 'Svizzera']],
        ['Español',         ['es-AR', 'Argentina'],
                            ['es-BO', 'Bolivia'],
                            ['es-CL', 'Chile'],
                            ['es-CO', 'Colombia'],
                            ['es-CR', 'Costa Rica'],
                            ['es-EC', 'Ecuador'],
                            ['es-SV', 'El Salvador'],
                            ['es-ES', 'España'],
                            ['es-US', 'Estados Unidos'],
                            ['es-GT', 'Guatemala'],
                            ['es-HN', 'Honduras'],
                            ['es-MX', 'México'],
                            ['es-NI', 'Nicaragua'],
                            ['es-PA', 'Panamá'],
                            ['es-PY', 'Paraguay'],
                            ['es-PE', 'Perú'],
                            ['es-PR', 'Puerto Rico'],
                            ['es-DO', 'República Dominicana'],
                            ['es-UY', 'Uruguay'],
                            ['es-VE', 'Venezuela']],
        ['Pусский',         ['ru-RU']],
    ];

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
            yesSir.hashObserver.setPreviousHash(window.location.hash);

            yesSir.hashHandlers.setHashRequest({
                requestValue: interimTranscript, 
                isExecuteActionBlockByTitle: false
            });
        }

        function onFinalTranscript(finalTranscript) {                   
            searchInputField.style.color = 'black';
            const lastCharacterFinalTranscript = finalTranscript[finalTranscript.length - 1];

            if (lastCharacterFinalTranscript === '.') {
                finalTranscript = finalTranscript.substr(0, finalTranscript.length - 1);
            }

            yesSir.hashObserver.setPreviousHash(window.location.hash);

            yesSir.hashHandlers.setHashRequest({
                requestValue: finalTranscript,
                isExecuteActionBlockByTitle: true,
                isListenText: true
            });
        }

        function onEnd() {
            that.#onStopRecognizing();
        }

        this.startRecognizing(option);
    }
    
    stopRecognizing = () => {
        this.stopRecognizing();
        this.#onStopRecognizing();
    }

    setLanguge(newLanguage) {
        this.setLanguge(newLanguage)
    }

    isRecognizing() {
        return this.isRecognizing();
    }


    #onStopRecognizing() {
        this.#view.showStopRecognition();
    }

    startRecognizing = (option = {
        callbackStart: undefined,
        callbackInterimTranscript: undefined, 
        callbackFinalTranscript: undefined, 
        callbackEnd: undefined,
        callbackError: undefined,
        language: undefined}) => {    
            const that = this;

            const callbackStart = option.callbackStart;
            const callbackInterimTranscript = option.callbackInterimTranscript;
            const callbackFinalTranscript = option.callbackFinalTranscript;
            const callbackEnd = option.callbackEnd;
            const callbackError = option.callbackError;
            const recognitionLanguage = option.language != undefined ? option.language : 'en-US';

            let isFinalResult = false;
            
            this.#recognizer.lang = recognitionLanguage;
            this.#recognizer.start();
            this.#isRecognizing = true;

            this.#recognizer.onstart = function() {
                if (callbackStart) callbackStart();
            }

            // Используем колбек для обработки результатов
            this.#recognizer.onresult = function (event) {
                let result = event.results[event.resultIndex];

                if (result.isFinal) {
                    isFinalResult = true;
                    const finalTranscript = result[0].transcript;
                    
                    if (callbackFinalTranscript) callbackFinalTranscript(finalTranscript);
                }
                else {
                    const interimTranscript = result[0].transcript;

                    if (callbackInterimTranscript) callbackInterimTranscript(interimTranscript);
                }
        }

        this.#recognizer.onend = function() {
            if (isFinalResult === false && that.#isRecognizing) { 
                that.startRecognizing(option);
            }
            else {
                that.#isRecognizing = false;
                if (callbackEnd) callbackEnd();
            }
        }

        this.#recognizer.onerror = function() {
            if (callbackError) callbackError();
        }
    }
    
    
    
    stopRecognizing = () => {
        if (this.#isRecognizing === false) return;

        this.#recognizer.stop();
        this.#isRecognizing = false;
    }

    setLanguge(newLanguage) {
        this.#recognizer.lang = newLanguage;
    }

    isRecognizing() {
        return this.#isRecognizing;
    }

    isBrowserSupportRecognition() {
        return 'webkitSpeechRecognition' in window;
    }
}