class FileManager {
    constructor(textManager) {
        this.textManager = textManager;
    }

    downloadFile = function(content, file_name, extension = '.txt') {
        // Encode spec symbols.
        const encoded_content = encodeURIComponent(content);
    
        const element = document.createElement('a');
      
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encoded_content);
        element.setAttribute('download', file_name + extension);
      
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    uploadFile = function(onFileLoadedCallback) {
        const that = this;
        
        const reader = new FileReader();
        reader.onload = handleFileLoad;
        reader.readAsText(event.target.files[0]);
    
        // on file loaded.
        function handleFileLoad(event) {
            const textFromFile = event.target.result;
            let fromSymbol = '%';
            let toSymbol = '<percentage>';
            const textFromFileWithEncodedPercentage = that.textManager.replaceSymbols(textFromFile, fromSymbol, toSymbol);
            let decodedTextFromFile = decodeURIComponent(textFromFileWithEncodedPercentage);
            
            fromSymbol = '<percentage>';
            toSymbol = '%';
            decodedTextFromFile = that.textManager.replaceSymbols(decodedTextFromFile, fromSymbol, toSymbol);
    
            onFileLoadedCallback(decodedTextFromFile);
        }
    }
}