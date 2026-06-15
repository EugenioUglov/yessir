class NoteController {
    constructor(actionBlockService, noteService, hashService) {
        const that = this;
        this.actionBlockService = actionBlockService;
        this.noteService = noteService;
        this.hashService = hashService;

        this.view = new NoteView();

        this.bindViewEvents();


  

        const commandObjects = [
            {
                key: 'close', title: 'Close', action: () => {that.#onClose();}, tags: ['close', 'exit', 'quit'], icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Signe_de_piste_-_Fausse_piste.svg/1200px-Signe_de_piste_-_Fausse_piste.svg.png'
            },
            {
                key: 'scrolltotop', title: 'Scroll to top', action: () => {window.scrollTo(0, 0);}, tags: ['scroll', 'top', 'scrolling'], icon: 'https://cdn4.iconfinder.com/data/icons/free-ui/64/v-8-1024.png'
            },
            {
                key: 'opensettings', title: 'Edit Action-Block', action: () => {
                    $("#content_executed_from_actionBlock").hide();

                    const title = $("#content_executed_from_actionBlock")
                      .find(".title")
                      .text();

                    that.actionBlockService.openActionBlockSettings(title);}, tags: ['Action-Block', 'settings', 'setting', 'update', 'edit'], icon: 'https://cdn.onlinewebfonts.com/svg/img_120429.png'
            },
            {
                key: 'quicktextedit', title: 'Quick edit text', action: () => {
                    const title = $('#content_executed_from_actionBlock .note_title');
                    const content = $('#content_executed_from_actionBlock .content');
                    title.attr('contenteditable', 'true');
                    content.attr('contenteditable', 'true');
                    $('#btn_quick_update_actionBlock').show();
                }, tags: ['quick', 'text', 'edit', 'change', 'update'], icon: 'https://img.icons8.com/?size=100&id=tQvI71EfIWy3&format=png'
            },
            {
                key: 'listen', title: 'Read text aloud', action: () => {
                    that.noteService.noteSpeakerService.speak();
                }, tags: ['text', 'aloud', 'listen', 'speak', 'talk', 'tell'], icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Font_Awesome_5_solid_volume-up.svg/800px-Font_Awesome_5_solid_volume-up.svg.png'
            },
            {
                key: 'aligntexttoleft', title: 'Align text to left', action: () => {
                    const contentElement = document.querySelector('#content_executed_from_actionBlock .content');

                    if (contentElement) {
                        contentElement.style.textAlign = 'left';
                    }
                }, tags: ['text', 'align', 'left'], icon: 'https://cdn4.iconfinder.com/data/icons/user-interface-pack-3-outline/48/left-align-4598625-512.png'
            },
            {
                key: 'aligntexttocenter', title: 'Align text to center', action: () => {
                    const contentElement = document.querySelector('#content_executed_from_actionBlock .content');

                    if (contentElement) {
                        contentElement.style.textAlign = 'center';
                    }
                }, tags: ['text', 'align', 'center'], icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Feather-core-align-center.svg/1200px-Feather-core-align-center.svg.png'
            }
            
        ];

        

        setCommandInputFiled(commandObjects);
    }




    bindViewEvents() {
        this.view.bindClickBtnClose(this.#onClose);
    }

    #onClose = () => {
        this.noteService.close();
        if (window.location.hash.toUpperCase().includes('#editActionBlock'.toUpperCase())) {
            this.actionBlockService.setDefaultValuesForSettingsElementsActionBlock();
        } else if (window.location.hash.toUpperCase().includes('#createnote'.toUpperCase())) {
            this.view.clearAllInputElements();
        }

        this.hashService.setHashMainPrevious();
        // this.hashService.openPreviousPage();
    }
}