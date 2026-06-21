class NoteInitializer {
    constructor(hashHandler, noteSpeakerService) {
        this.#view = new NoteView();
        this.#controller = new NoteController(this.#view, hashHandler, noteSpeakerService);

        return this.#controller;
    }

    #view;
    #controller;
}