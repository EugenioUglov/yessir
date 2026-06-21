// scripts-loader.js
(function() {
    const scripts = [
        // Внешние библиотеки (CDN)
        "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js",
        "./js/libraries/opensource/jquery-3.6.0.min.js",
        "https://code.jquery.com/jquery-3.6.0.js",
        "https://code.jquery.com/ui/1.13.0/jquery-ui.js",
        "./js/libraries/opensource/observable.js",
        "./js/libraries/opensource/md5.min.js",

        // Основные компоненты
        "./js/commandInputField.js",
        "./packages/actionBlock/actionBlockNoteCommands.js",
        "./packages/firebase/firebaseData.js",

        // Библиотеки (Core)
        "./js/libraries/inputFieldWithSuggestions.js",
        "./js/libraries/mapDataStructure.js",
        "./js/libraries/domElementManager.js",
        "./js/libraries/dateManager.js",
        "./js/libraries/firebaseManager.js",
        "./js/libraries/textManager.js",
        "./js/libraries/dbManager.js",
        "./js/libraries/fileManager.js",
        "./js/libraries/dialogWindow.js",
        "./js/libraries/dropdownManager.js",
        "./js/libraries/arrayManager.js",
        "./js/libraries/inputDeviceManger.js",
        "./packages/voiceRecognition/voiceRecognitionManager.js",
        "./js/libraries/textToSpeechSynthesizer.js",
        "./js/libraries/hashHelper.js",
        "./js/libraries/elementsVisibility.js",
        "./js/libraries/defaultActionBlocks.js",
        "./js/libraries/googleSpeechRecognition.js",
        "./js/libraries/googleTextToSpeech.js",
        "./js/libraries/nounNumber.js",
        "./js/libraries/tagsNormalizer.js",
        "./js/libraries/hashPassword.js",
        "./js/libraries/infoPanel.js",
        "./js/libraries/idGenerator.js",

        // Сервисы
        "./packages/actionBlock/actionBlockService.js",
        "./packages/search/searchSevice.js",
        "./packages/noteSpeaker/noteSpeakerService.js",
        "./packages/voiceRecognition/voiceRecognitionService.js",
        "./packages/autocomplete/autocompleteService.js",
        "./js/hashHandler.js",
        "./packages/dataStorage/dataStorageService.js",
        "./packages/loader/loaderController.js",
        "./packages/modalBox/modalBoxController.js",
        "./packages/loader/modalLoadingController.js",



        // Модели
        "./packages/noteSpeaker/noteSpeakerModel.js",
        "./packages/actionBlock/actionBlockWithIdModel.js",
        "./packages/voiceRecognition/voiceRecognitionModel.js",
        "./packages/logs/logsModel.js",

        // Представления (Views)
        "./packages/note/noteView.js",
        "./js/views/pageElementView.js",
        "./packages/scroll/scrollView.js",
        "./packages/noteSpeaker/noteSpeakerView.js",
        "./packages/voiceRecognition/voiceRecognitionView.js",
        "./packages/actionBlock/actionBlockView.js",
        "./packages/logs/logsView.js",
        "./packages/autocomplete/autocompleteView.js",
        "./packages/search/searchView.js",
        "./packages/loader/loaderView.js",
        "./packages/dataStorage/dataStorageView.js",
        "./packages/modalBox/modalBoxView.js",
        "./packages/login/loginView.js",

        // Контроллеры
        "./packages/logs/logsController.js",
        "./packages/note/noteController.js",
        "./packages/noteSpeaker/noteSpeakerController.js",
        "./packages/voiceRecognition/voiceRecognitionController.js",
        "./packages/scroll/scrollController.js",
        "./packages/search/searchController.js",
        "./packages/dataStorage/dataStorageController.js",
        "./packages/actionBlock/actionBlockController.js",
        "./packages/autocomplete/autocompleteController.js",

        "./packages/actionBlock/editActionBlockDataHolder.js",
        

        // Firebase & Дополнения
        "https://www.gstatic.com/firebasejs/7.15.5/firebase-app.js",
        "https://www.gstatic.com/firebasejs/7.15.5/firebase-database.js",
        "./packages/firebase/firebaseConfig.js",
        "./js/libraries/unspashImageSearcher.js",

        
        "./packages/scroll/index.js",
        "./packages/loader/index.js",
        "./packages/note/index.js",
        "./packages/modalBox/index.js",
        "./packages/logs/index.js",
        "./packages/search/index.js",
        

        // Точка входа
        "./js/main.js"
    ];

    // Функция для последовательной загрузки (важно для зависимостей!)
    function loadScripts(index) {
        if (index < scripts.length) {
            const script = document.createElement('script');
            script.src = scripts[index];
            script.async = false; // Сохраняем порядок выполнения
            script.onload = () => loadScripts(index + 1);
            document.body.appendChild(script);
        } else {
            // Инициализация пакетов после загрузки всех скриптов
            console.log("All scripts loaded. Initializing packages...");
            initializeModules();
        }
    }

    function initializeModules() {
        $(function(){
            $("#advancedSearcherByTags").load("packages/advancedSearchearByTags/index.html");
            $("#loginModule").load("packages/login/index.html");
        });
    }

    loadScripts(0);
})();