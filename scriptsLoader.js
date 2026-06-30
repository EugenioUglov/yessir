(function() {
    const scripts = [
        // Внешние библиотеки (CDN)
        "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/mustache.js/0.1/mustache.min.js",
        "./libraries/opensource/jquery-3.6.0.min.js",
        "https://code.jquery.com/jquery-3.6.0.js",
        "https://code.jquery.com/ui/1.13.0/jquery-ui.js",
        "./libraries/opensource/observable.js",
        "./libraries/opensource/md5.min.js",

        "./shared/utils/urlValidator.js",
        "./shared/utils/moduleLoader.js",
        "./packages/test/test.js",
        "./shared/projectAssetLoader.js",
        "./shared/components/bottomInfoPanel/index.js",

        // Основные компоненты
        "./commandInputField.js",
        "./packages/actionBlock/actionBlockNoteCommands.js",
        "./packages/firebase/firebaseData.js",

        // Библиотеки (Core)
        "./libraries/inputFieldWithSuggestions.js",
        "./libraries/mapDataStructure.js",
        "./libraries/domElementManager.js",
        "./libraries/dateManager.js",
        "./libraries/firebaseManager.js",
        "./libraries/textManager.js",
        "./libraries/dbManager.js",
        "./libraries/fileManager.js",
        "./libraries/dialogWindow.js",
        "./libraries/dropdownManager.js",
        "./libraries/arrayManager.js",
        "./libraries/inputDeviceManger.js",
        "./packages/voiceRecognition/voiceRecognitionManager.js",
        "./libraries/textToSpeechSynthesizer.js",
        "./libraries/hashHelper.js",
        "./libraries/elementsVisibility.js",
        "./libraries/defaultActionBlocks.js",
        "./libraries/googleSpeechRecognition.js",
        "./libraries/googleTextToSpeech.js",
        "./libraries/nounNumber.js",
        "./libraries/tagsNormalizer.js",
        "./libraries/hashPassword.js",
        // "./libraries/infoPanel.js",
        "./libraries/idGenerator.js",

        // Сервисы
        "./packages/actionBlock/actionBlockService.js",
        // "./packages/search/searchSevice.js",
        "./packages/noteSpeaker/noteSpeakerService.js",
        "./packages/voiceRecognition/voiceRecognitionService.js",
        "./packages/autocomplete/autocompleteService.js",
        "./hashHandler.js",
        "./packages/dataStorage/dataStorageService.js",
        "./core/modalLoadingController.js",



        // Модели
        "./packages/noteSpeaker/noteSpeakerModel.js",
        "./packages/actionBlock/actionBlockWithIdModel.js",
        "./packages/voiceRecognition/voiceRecognitionModel.js",
        "./packages/logs/logsModel.js",

        // Представления (Views)
        "./packages/note/noteView.js",
        "./views/pageElementView.js",
        // "./packages/scroll/scrollView.js",
        "./packages/noteSpeaker/noteSpeakerView.js",
        "./packages/voiceRecognition/voiceRecognitionView.js",
        "./packages/actionBlock/actionBlockView.js",
        "./packages/logs/logsView.js",
        "./packages/autocomplete/autocompleteView.js",
        // "./packages/search/searchView.js",
        "./packages/dataStorage/dataStorageView.js",
        "./packages/login/loginView.js",

        // Контроллеры
        "./packages/logs/logsController.js",
        "./packages/note/noteController.js",
        "./packages/noteSpeaker/noteSpeakerController.js",
        "./packages/voiceRecognition/voiceRecognitionController.js",
        // "./packages/scroll/scrollController.js",
        // "./packages/search/searchController.js",
        "./packages/dataStorage/dataStorageController.js",
        "./packages/actionBlock/actionBlockController.js",
        "./packages/autocomplete/autocompleteController.js",

        "./packages/actionBlock/editActionBlockDataHolder.js",
        

        // Firebase & Дополнения
        "https://www.gstatic.com/firebasejs/7.15.5/firebase-app.js",
        "https://www.gstatic.com/firebasejs/7.15.5/firebase-database.js",
        "./packages/firebase/firebaseConfig.js",
        "./libraries/unspashImageSearcher.js",

        
        "./packages/scroll/index.js",
        "./shared/components/multiColorCircleLoader/index.js",
        "./packages/note/index.js",
        "./shared/components/modalBox/index.js",
        "./packages/logs/index.js",
        "./packages/search/index.js",

        "./core/searchControllerEventBinder.js",
        

        // Точка входа
        "./main.js"
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