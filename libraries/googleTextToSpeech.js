class GoogleTextToSpeech {
    constructor() {

    }

    #isSpeaking = false;

    speak(text_to_speak, language = 'en-US', onEndSpeak) {
        const that = this;

        const speechSynthesis = new SpeechSynthesisUtterance();
        speechSynthesis.lang = language;
        speechSynthesis.text = text_to_speak;
        const speak_bot = speechSynthesis;
        this.#isSpeaking = true;

        speak_bot.onend = () => {
            that.#isSpeaking = false;
            if (onEndSpeak) onEndSpeak();
        }

        window.speechSynthesis.speak(speechSynthesis);
    }

    stopSpeak() {
        window.speechSynthesis.cancel();
        this.#isSpeaking = false;
    }

    isSpeaking() {
        return this.#isSpeaking;
    }
}
