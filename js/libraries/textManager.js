class TextManager {
  constructor() {}

  /**
   * Get array of splited string.
   * */
  splitText = function (stringToSplit, separator = " ") {
    let array = [];
    let splitedText = stringToSplit.split(separator);

    for (const word of splitedText) {
      // if tag not empty.
      if (!!word) {
        array.push(word);
      }
    }
    return array;
  };

  getCuttedText = function (string, startSymbol, endSymbol) {
    let from;
    let to;

    if (startSymbol) from = string.indexOf(startSymbol) + 1;
    else from = 0;

    if (endSymbol) to = string.indexOf(endSymbol);
    else to = string.length;

    return string.slice(from, to);
  };

  // Compare text without Case-insensitive (small or large).
  // Return value of bool type depends values are same.
  // Example: someText === sometext | return true.
  isSame = function (text1, text2) {
    if (text1.toLowerCase() === text2.toLowerCase()) {
      return true;
    }

    return false;
  };

  getArrayByText = function (text, symbolSplit = ",") {
    return text.split(symbolSplit);
  };

  getTextInOneLine = function (text) {
    // Delete all lines break in text
    let textOfTextarea = text.replace(/(\r\n|\n|\r)/gm, " ");
    return textOfTextarea;
  };

  getConvertedTextToHTML = function (text) {
    let find = "\n";
    let replace = "<br>";
    return this.replaceSymbols(text, find, replace);
  };

  replaceSymbols = function (text, find, replace) {
    let escapedFind = find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    return text.replace(new RegExp(escapedFind, "g"), replace);
  };

  getTextWithoutLastSymbol(text_to_edit) {
    return text_to_edit.substr(0, text_to_edit.length - 1);
  }

  getLastWord = function (text, symolBeforeWord = " ") {
    // Delete spaces from the sides of text.
    text = text.trim();
    var separatedWords = text.split(symolBeforeWord);
    return separatedWords[separatedWords.length - 1];
  };

  getWords = function (str, firstIndexWord, lastIndexWord) {
    return str.split(/\s+/).slice(firstIndexWord, lastIndexWord).join(" ");
  };

  getFirstLine = function (str) {
    return str.split("\n")[0];
  };

  getSeparatedWordsByCamelCaseString = function (str) {
    return str.replace(/([a-z])([A-Z])/g, '$1 $2');
  };

  getTextWithoutSpecialCharactes(str, symbolInsted = " ") {
    return str.replace(/[^A-Z0-9]/ig, symbolInsted);
    // str.replace(/[^a-zа-яё0-9\s]/gi, symbolInsted);
    // str.replace(/[^a-zA-Z0-9-_ ]/g, symbolInsted);
  }
}
