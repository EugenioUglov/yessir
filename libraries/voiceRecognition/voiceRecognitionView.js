class VoiceRecognitionView {
    constructor() {
        
    }

    recognition = {};

    showSettings() {
        $('#elements_for_voice_recognition_settings').show();
    }

    bindClickBtnVoiceRecognition(handler) {
        $('#btnVoiceRecognition').on('click', (event) => {
            handler(event);
        });
    }

    bindClickDropdownSelectLanguage(handler) {
        document.getElementById('dropdown_select_language').addEventListener('click', function(e) {
            handler(event);
        });
    }

    showProgressRecognition() {
        $('#imgVoiceRecognition').attr('src', './icons/mic-animate.gif');
    }

    showStopRecognition() {
        $('#imgVoiceRecognition').attr('src', './icons/mic.gif');
    }
}
