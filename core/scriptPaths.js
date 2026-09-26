export const scripts = [
    // Внешние библиотеки (CDN)
    "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js",
    "./libraries/opensource/jquery-3.6.0.min.js",
    "https://code.jquery.com/jquery-3.6.0.js",
    "https://code.jquery.com/ui/1.13.0/jquery-ui.js",
    "./libraries/opensource/observable.js",
    "./libraries/opensource/md5.min.js",

    "./libraries/utils/urlValidator.js",
    "./libraries/utils/moduleLoader.js",
    "./libraries/projectAssetLoader.js",
    "./libraries/components/bottomInfoPanel/index.js",

    // Основные компоненты
    "./core/actionBlock/actionBlockNoteCommands.js",
    "./libraries/firebase/firebaseData.js",

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
    "./libraries/voiceRecognition/voiceRecognitionManager.js",
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
    "./libraries/noteSpeaker/noteSpeakerService.js",
    "./libraries/voiceRecognition/voiceRecognitionService.js",
    "./libraries/hashObserver.js",
    "./libraries/dataStorage/dataStorageService.js",
    "./core/modalLoadingController.js",


    "./libraries/domElementVisibility.js",

    // Модели
    "./libraries/noteSpeaker/noteSpeakerModel.js",
    "./core/actionBlock/actionBlockWithIdModel.js",
    "./libraries/voiceRecognition/voiceRecognitionModel.js",

    // Представления (Views)
    "./libraries/noteSpeaker/noteSpeakerView.js",
    "./libraries/voiceRecognition/voiceRecognitionView.js",
    "./core/actionBlock/actionBlockView.js",
    "./libraries/dataStorage/dataStorageView.js",

    // Контроллеры
    "./libraries/noteSpeaker/noteSpeakerController.js",
    "./libraries/voiceRecognition/voiceRecognitionController.js",
    "./libraries/dataStorage/dataStorageController.js",
    "./core/actionBlock/actionBlockController.js",

    "./core/actionBlock/editActionBlockDataHolder.js",
    

    // Firebase & Дополнения
    "https://www.gstatic.com/firebasejs/7.15.5/firebase-app.js",
    "https://www.gstatic.com/firebasejs/7.15.5/firebase-database.js",
    "./libraries/firebase/firebaseConfig.js",
    "./libraries/unspashImageSearcher.js",

    
    "./libraries/scroll/index.js",
    "./libraries/components/multiColorCircleLoader/index.js",
    "./modules/note/index.js",
    "./libraries/components/modalBox/index.js",
    "./libraries/components/topInfoPanel/index.js",
    "./modules/logs/index.js",
    "./libraries/search/index.js",
    "./libraries/components/loginPanel/index.js",
    "./libraries/components/centeredAlert/index.js",
    "./libraries/components/blackLoader/index.js",
    "./libraries/components/commandInputField.js",


    "./core/searchControllerEventBinder.js",
    "./core/routesConfig.js",
    "./core/hashHandlers.js",
    "./core/hashNameStrings.js",
    

    // Точка входа
    "./main.js"
];