class NoteSpeakerModel {
    constructor() {
        
    }

    #language = 'en-US';

    getLanguage() {
        return this.#language;
    }

    setLanguage(newLanguage) {
        this.#language = newLanguage;
    }
}