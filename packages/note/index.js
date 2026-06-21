class NoteInitializer {
    constructor(hashService, noteSpeakerService) {
        this.#view = new NoteView();
        this.#controller = new NoteController(this.#view, hashService, noteSpeakerService);

        return this.#controller;
    }

    #view;
    #controller;
}