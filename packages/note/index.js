class NoteInitializer {
    // constructor(hashHandler, noteSpeakerService) {
    //     this.#view = new NoteView();
    //     this.#controller = new NoteController(this.#view, hashHandler, noteSpeakerService);

    //     return this.#controller;
    // }

    static async create(hashHandler, noteSpeakerService) {
        const view = new NoteView();
        const controller = new NoteController(view, hashHandler, noteSpeakerService);

        return controller;
    }
}