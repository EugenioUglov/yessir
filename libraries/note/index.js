class NoteInitializer {
    // constructor(hashObserver, noteSpeakerService) {
    //     this.#view = new NoteView();
    //     this.#controller = new NoteController(this.#view, hashObserver, noteSpeakerService);

    //     return this.#controller;
    // }

    static async create(hashObserver, noteSpeakerService) {
        const view = new NoteView();
        const controller = new NoteController(view, hashObserver, noteSpeakerService);

        return controller;
    }
}