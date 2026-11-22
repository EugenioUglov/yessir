class TagsNormalizer {
    #textManager;


    constructor() {
        this.#textManager = new TextManager();
    }

    getHandledTags(initialTags) {
        let handledTags = [];

        handledTags = this.#getNormalizedTags(initialTags);
       
        handledTags = this.#getNormalizedTags([...handledTags, ...this.#getAdditionalTags(handledTags)]);
        
        return handledTags;
    }


    #getNormalizedTags(tags) {
        if (Array.isArray(tags)) {
            tags = tags.toString();
        }

        let normalizedTags;
    
        // Change all new lines to symbol ',".
        const tagsWithoutNewLine = tags.replaceAll('\n', ',');
        //tags_lower_case = tags_without_new_line.toLowerCase();
    
        let tagsArray = this.#textManager.getArrayByText(tagsWithoutNewLine);
        
        // Delete empty symbols from sides in text.
        for (const indexTag in tagsArray) {
            tagsArray[indexTag] = tagsArray[indexTag].trim();
        }
    
        // Delete same tags.
        const tagsSet = new Set(tagsArray);
    
        // Convertation from Set to Array.
        normalizedTags = Array.from(tagsSet);
    
        return normalizedTags;
    }

    #getAdditionalTags(tags) {
         if (Array.isArray(tags) === false) {
            tags = this.#textManager.getArrayByText(tags);
        }

        const additionalTags = [];

        for (const tag of tags) {
            let additionalTag = '';

            const tagWithoutSpecialCharacters = this.#textManager.getTextWithoutSpecialCharactes(tag);

            if (tag != tagWithoutSpecialCharacters) {
                additionalTag = tagWithoutSpecialCharacters;
            }

            if (tagWithoutSpecialCharacters === tagWithoutSpecialCharacters.toUpperCase() == false && tagWithoutSpecialCharacters === tagWithoutSpecialCharacters.toLowerCase() === false) {
                const tagWithSeparatedWords = this.#textManager.getSeparatedWordsByCamelCaseString(tagWithoutSpecialCharacters);

                additionalTag = tagWithSeparatedWords;
            }

            if (additionalTag) {
                additionalTags.push(additionalTag);
            }
        }

        return additionalTags;
    }
}