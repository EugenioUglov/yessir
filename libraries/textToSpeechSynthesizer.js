class TextToSpeechSynthesizer {
    constructor() {

    }

    #language = 'en-US';
    #isSpeaking = false;

    speak(textToSpeak, onEndSpeak) {
        const message = new SpeechSynthesisUtterance();
        message.lang = this.#language;
        message.text = textToSpeak;
        const speakBot = message;
        this.#isSpeaking = true;

        speakBot.onend = () => {
            this.#isSpeaking = false;
            if (onEndSpeak) onEndSpeak();
        }

        window.speechSynthesis.speak(message);
    }

    stopSpeak() {
        window.speechSynthesis.cancel();
        this.#isSpeaking = false;
    }

    setLanguage(newLanguage) {
        this.#language = newLanguage;
    }

    isSpeaking() {
        return this.#isSpeaking;
    }
}