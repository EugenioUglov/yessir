class NounNumber {
  constructor() {}

  async getSingularizedWord(wordToSingularize, onDone, onCatch) {
    console.log("word_to_singularize", wordToSingularize);
    fetch(
      `https://yessirapi.onrender.com/singular?request=` + wordToSingularize
    )
      .then((response) => response.json())
      .then((data) => {
        if (onDone != undefined) onDone(data.response);
      })
      .catch((error) => {
        if (onCatch != undefined) onCatch(error);
      });
  }

  async getSingularizedWords(wordsToSingularize, onDone, onCatch) {
    let countSingularizedWords = 0;
    const singularized_words = [];

    const getSingularizeWordsPromise = new Promise((resolve, reject) => {
      wordsToSingularize.map((wordToSingularize) => {
        this.getSingularizedWord(
          wordToSingularize,
          (singularizedWord) => {
            singularized_words.push(singularizedWord);
            countSingularizedWords++;
            if (countSingularizedWords >= wordsToSingularize.length) {
              resolve(singularized_words);
            }
          },
          (error) => {
            reject(error);
          }
        );
      });
    });

    getSingularizeWordsPromise.then(
      (singularizedWords) => {
        if (onDone != undefined) onDone(singularizedWords);
      },
      (error) => {
        if (onCatch != undefined) onCatch(error);
      }
    );
  }
}