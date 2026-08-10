export const scripts = [
    // Внешние библиотеки (CDN)
    "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js",
    "./libraries/opensource/jquery-3.6.0.min.js",
    "https://code.jquery.com/jquery-3.6.0.js",
    "https://code.jquery.com/ui/1.13.0/jquery-ui.js",
    "./libraries/opensource/observable.js",
    "./libraries/opensource/md5.min.js",

    "./shared/utils/urlValidator.js",
    "./shared/utils/moduleLoader.js",
    "./shared/projectAssetLoader.js",
    "./shared/components/bottomInfoPanel/index.js",

    // Основные компоненты
    "./commandInputField.js",
    "./packages/actionBlock/actionBlockNoteCommands.js",
    "./packages/firebase/firebaseData.js",

    // Библиотеки (Core)
    "./libraries/inputFieldWithSuggestions.js",
    "./libraries/mapDataStructure.js",
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
    "./packages/noteSpeaker/noteSpeakerService.js",
    "./packages/voiceRecognition/voiceRecognitionService.js",
    "./packages/autocomplete/autocompleteService.js",
    "./hashObserver.js",
    "./packages/dataStorage/dataStorageService.js",
    "./core/modalLoadingController.js",


    "./shared/domElementVisibility.js",

    // Модели
    "./packages/noteSpeaker/noteSpeakerModel.js",
    "./packages/actionBlock/actionBlockWithIdModel.js",
    "./packages/voiceRecognition/voiceRecognitionModel.js",
    "./packages/logs/logsModel.js",

    // Представления (Views)
    "./packages/note/noteView.js",
    "./packages/noteSpeaker/noteSpeakerView.js",
    "./packages/voiceRecognition/voiceRecognitionView.js",
    "./packages/actionBlock/actionBlockView.js",
    "./packages/logs/logsView.js",
    "./packages/autocomplete/autocompleteView.js",
    "./packages/dataStorage/dataStorageView.js",

    // Контроллеры
    "./packages/logs/logsController.js",
    "./packages/note/noteController.js",
    "./packages/noteSpeaker/noteSpeakerController.js",
    "./packages/voiceRecognition/voiceRecognitionController.js",
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
    "./shared/components/topInfoPanel/index.js",
    "./packages/logs/index.js",
    "./packages/search/index.js",
    "./shared/components/loginPanel/index.js",
    "./shared/components/centeredAlert/index.js",
    "./shared/components/blackLoader/index.js",

    "./core/searchControllerEventBinder.js",
    "./core/routesConfig.js",
    "./core/hashHandlers.js",
    "./core/hashNameStrings.js",
    

    // Точка входа
    "./main.js"
];