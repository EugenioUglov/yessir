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
        "./js/actionBlockNoteCommands.js",
        "./js/firebaseData.js",

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
        "./js/libraries/voiceRecognitionManager.js",
        "./js/libraries/speakerManager.js",
        "./js/libraries/hashManager.js",
        "./js/libraries/blockManager.js",
        "./js/libraries/defaultActionBlocks.js",
        "./js/libraries/googleSpeechRecognition.js",
        "./js/libraries/googleTextToSpeech.js",
        "./js/libraries/nounNumber.js",
        "./js/libraries/tagsNormalizer.js",
        "./js/libraries/hashPassword.js",
        "./js/libraries/infoPanel.js",

        // Сервисы
        "./js/services/actionBlockService.js",
        "./js/services/searchSevice.js",
        "./js/services/noteSpeakerService.js",
        "./js/services/voiceRecognitionService.js",
        "./js/services/autocompleteService.js",
        "./js/services/hashService.js",
        "./js/services/scrollService.js",
        "./js/services/noteService.js",
        "./js/services/logsService.js",
        "./js/services/dataStorageService.js",
        "./js/services/loadingService.js",
        "./js/services/modalBoxService.js",
        "./js/services/modalLoadingService.js",

        // Модели
        "./js/models/noteSpeakerModel.js",
        "./js/models/actionBlockModel.js",
        "./js/models/voiceRecognitionModel.js",
        "./js/models/logsModel.js",

        // Представления (Views)
        "./js/views/noteView.js",
        "./js/views/pageElementView.js",
        "./js/views/scrollView.js",
        "./js/views/noteSpeakerView.js",
        "./js/views/voiceRecognitionView.js",
        "./js/views/actionBlockView.js",
        "./js/views/logsView.js",
        "./js/views/autocompleteView.js",
        "./js/views/searchView.js",
        "./js/views/loadingView.js",
        "./js/views/dataStorageView.js",
        "./js/views/modalBoxView.js",
        "./js/views/loginView.js",

        // Контроллеры
        "./js/controllers/logsController.js",
        "./js/controllers/hashController.js",
        "./js/controllers/noteController.js",
        "./js/controllers/speakerController.js",
        "./js/controllers/noteSpeakerController.js",
        "./js/controllers/voiceRecognitionController.js",
        "./js/controllers/scrollController.js",
        "./js/controllers/searchController.js",
        "./js/controllers/dataStorageController.js",
        "./js/controllers/actionBlockController.js",
        "./js/controllers/autocompleteController.js",

        "./js/editActionBlockDataHolder.js",

        // Firebase & Дополнения
        "https://www.gstatic.com/firebasejs/7.15.5/firebase-app.js",
        "https://www.gstatic.com/firebasejs/7.15.5/firebase-database.js",
        "./js/firebaseConfig.js",
        "./js/libraries/unspashImageSearcher.js",

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