class TagsNormalizer {
    #textManager;


    constructor() {
        this.#textManager = new TextManager();
    }

    getHandledTags(initialTags) {
        let handledTags = [];

        handledTags = this.#getNormalizedTags(initialTags);
       
        handledTags = this.#getNormalizedTags([...handledTags, ...this.#getAdditionalTags(handledTags)]);

        // 1. Загружаем данные
        const synonymGroups = JSON.parse(localStorage.getItem('synonymTags')) || []; // [[s1, s2], [s3, s4]]
        const childrenGroups = JSON.parse(localStorage.getItem('childrenTags')) || []; // [{parent, children: []}]  

        function syncUserSynonymsWithChildren() {
            // 1. Сначала расширяем handledTags всеми синонимами, которые в нем уже есть
            // Если в handledTags есть "автомобиль", а в синонимах ["автомобиль", "машина"], 
            // добавляем "машина" в handledTags.
            synonymGroups.forEach(group => {
                const hasMatch = group.some(synonym => 
                    handledTags.map(t => t.toLowerCase()).includes(synonym.toLowerCase())
                );
                
                if (hasMatch) {
                    group.forEach(synonym => {
                        if (!handledTags.includes(synonym)) handledTags.push(synonym);
                    });
                }
            });

            // 2. Теперь проверяем каждый тег из обновленного handledTags 
            // на наличие дочерних элементов в childrenGroups
            const tagsToProcess = [...handledTags]; // Копия для итерации
            
            tagsToProcess.forEach(tag => {
                const foundChildGroup = childrenGroups.find(cGroup => 
                    cGroup.parent.toLowerCase() === tag.toLowerCase()
                );

                if (foundChildGroup) {
                    foundChildGroup.children.forEach(child => {
                        if (!handledTags.includes(child)) {
                            handledTags.push(child);
                        }
                    });
                }
            });

            console.log('Итоговый результат:', handledTags);
        }

        syncUserSynonymsWithChildren();

        return handledTags;
    }


    #getNormalizedTags(tags) {
        if (Array.isArray(tags)) {
            tags = tags.toString();
        }

        let normalizedTags;
    
        // Change all new lines to symbol ',".
        const tags_without_new_line = tags.replaceAll('\n', ',');
        //tags_lower_case = tags_without_new_line.toLowerCase();
    
        let tags_array = this.#textManager.getArrayByText(tags_without_new_line);
        
        // Delete empty symbols from sides in text.
        for (const i_tag in tags_array) {
            tags_array[i_tag] = tags_array[i_tag].trim();
        }
    
        // Delete same tags.
        const tags_set = new Set(tags_array);
    
        // Convertation from Set to Array.
        normalizedTags = Array.from(tags_set);
    
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