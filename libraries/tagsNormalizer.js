/**
 * Normalizes and expands user-provided tags.
 *
 * This class takes raw tag input (array or string), splits it into individual tags,
 * removes duplicates and whitespace, derives additional forms (e.g. without special
 * characters or split from camelCase), and enriches the list with user-defined
 * synonyms and child tags stored in localStorage.
 */
class TagsNormalizer {
    #textManager;

    /**
     * Creates an instance of TagsNormalizer.
     * Initializes the internal TextManager used for splitting and cleaning tag text.
     */
    constructor() {
        this.#textManager = new TextManager();
    }

    /**
     * Public entry point for tag normalization.
     *
     * Processes raw user-provided tags through the following steps:
     *   1. Normalizes the initial tags (splits by delimiters, trims whitespace, removes duplicates).
     *   2. Derives additional tags from the normalized list (special-character removal, camelCase splitting).
     *   3. Normalizes the combined list again.
     *   4. Enriches the list with user-defined synonyms and child tags from localStorage.
     *
     * @param {Array|string} initialTags - Raw tags provided as an array or a string.
     * @returns {Array} Array of unique, normalized, and expanded tag strings.
     */
    getHandledTags(initialTags) {
        let handledTags = [];

        handledTags = this.#getNormalizedTags(initialTags);
       
        handledTags = this.#getNormalizedTags([...handledTags, ...this.#getAdditionalTags(handledTags)]);

        // Load user-defined synonym and child tag groups from localStorage.
        // synonymGroups: array of arrays, e.g. [[s1, s2], [s3, s4]] – words treated as synonyms.
        // childrenGroups: array of objects {parent, children: []} – child tags linked to a parent tag.
        const synonymGroups = JSON.parse(localStorage.getItem('synonymTags')) || []; // [[s1, s2], [s3, s4]]
        const childrenGroups = JSON.parse(localStorage.getItem('childrenTags')) || []; // [{parent, children: []}]

        /**
         * Helper function that enriches `handledTags` with synonyms and child tags.
         * Reads synonymGroups and childrenGroups from localStorage and pushes any
         * matching related tags into the handledTags array.
         */
        function syncUserSynonymsWithChildren() {
            // Parses a tag string into an array of lowercase tokens.
            // Splits first by commas, then by spaces, trims each part,
            // lowercases it, and filters out empty strings.
            function parseTagString(str) {
                if (!str) return [];
                return str.split(/[,]+/) // First, split by commas
                    .flatMap(part => part.split(/\s+/)) // Then, split by spaces
                    .map(t => t.trim().toLowerCase())
                    .filter(t => t !== '');
            }

            // Build a flat list of all unique lowercase tokens currently in handledTags.
            let flatHandledTags = [];
            handledTags.forEach(t => {
                flatHandledTags.push(...parseTagString(t));
                if (!flatHandledTags.includes(t.toLowerCase())) {
                    flatHandledTags.push(t.toLowerCase());
                }
            });

            // 1. Expand handledTags with synonyms:
            //    For each synonym group, if at least one of its words is already present
            //    in handledTags, add all other words from that group.
            synonymGroups.forEach(group => {
                const groupNormalized = group.map(s => s.toLowerCase());
                const hasMatch = groupNormalized.some(synonym => 
                    flatHandledTags.includes(synonym)
                );
                
                if (hasMatch) {
                    group.forEach(synonym => {
                        if (!handledTags.includes(synonym)) {
                            handledTags.push(synonym);
                        }
                    });
                }
            });

            // Rebuild the flat token list after synonyms were added.
            flatHandledTags = [];
            handledTags.forEach(t => {
                flatHandledTags.push(...parseTagString(t));
                if (!flatHandledTags.includes(t.toLowerCase())) {
                    flatHandledTags.push(t.toLowerCase());
                }
            });

            // 2. Check matching with child groups:
            //    For each tag currently in handledTags, look for a child group whose
            //    parent shares at least one word with the tag. If found, add all
            //    children of that group to handledTags.
            const tagsToProcess = [...handledTags];

            tagsToProcess.forEach(tag => {
                const foundChildGroup = childrenGroups.find(cGroup => {
                    // Split the parent group's tags by commas and spaces.
                    const parentsList = parseTagString(cGroup.parent);

                    // Split the currently processed tag into words (in case of multi-word tags).
                    const currentTagParts = parseTagString(tag);

                    // Return true if there is at least one common word between parent list and tag parts.
                    return currentTagParts.some(part => parentsList.includes(part));
                });

                if (foundChildGroup) {
                    foundChildGroup.children.forEach(child => {
                        if (!handledTags.includes(child)) {
                            handledTags.push(child);
                        }
                    });
                }
            });
        }

        // Execute the synonyms and children enrichment step.
        syncUserSynonymsWithChildren();

        return handledTags;
    }


    /**
     * Private method that normalizes a list of tags.
     *
     * Accepts an array or a string, replaces newline characters with commas,
     * splits the text into individual tags via TextManager, trims whitespace
     * from each tag, and removes duplicates.
     *
     * @param {Array|string} tags - Tags to normalize.
     * @returns {Array} Array of unique, trimmed tag strings.
     */
    #getNormalizedTags(tags) {
        if (Array.isArray(tags)) {
            tags = tags.toString();
        }

        let normalizedTags;
    
        // Replace all newline characters with commas so the text can be split uniformly.
        const tagsWithoutNewLine = tags.replaceAll('\n', ',');
        //tags_lower_case = tags_without_new_line.toLowerCase();
    
        // Convert the cleaned text into an array of tags via TextManager.
        let tagsArray = this.#textManager.getArrayByText(tagsWithoutNewLine);
        
        // Trim leading and trailing whitespace from each tag.
        for (const indexTag in tagsArray) {
            tagsArray[indexTag] = tagsArray[indexTag].trim();
        }
    
        // Remove duplicate tags using a Set.
        const tagsSet = new Set(tagsArray);
    
        // Convert the Set back into an array.
        normalizedTags = Array.from(tagsSet);
    
        return normalizedTags;
    }

    /**
     * Private method that derives additional tags from the given list.
     *
     * For each tag it may produce:
     *   - The tag with special characters removed.
     *   - CamelCase words separated into individual tags.
     *
     * @param {Array|string} tags - Tags to derive additional forms from.
     * @returns {Array} Array of additional tag strings.
     */
    #getAdditionalTags(tags) {
        if (Array.isArray(tags) === false) {
            tags = this.#textManager.getArrayByText(tags);
        }

        const additionalTags = [];

        for (const tag of tags) {
            let additionalTag = '';

            // Remove special characters from the tag.
            const tagWithoutSpecialCharacters = this.#textManager.getTextWithoutSpecialCharactes(tag);

            // If special characters were present, use the cleaned version as an additional tag.
            if (tag != tagWithoutSpecialCharacters) {
                additionalTag = tagWithoutSpecialCharacters;
            }

            // If the tag contains mixed case (not fully uppercase and not fully lowercase),
            // split camelCase words into separate additional tags.
            if (tagWithoutSpecialCharacters === tagWithoutSpecialCharacters.toUpperCase() == false &&
                tagWithoutSpecialCharacters === tagWithoutSpecialCharacters.toLowerCase() === false) {
                const tagWithSeparatedWords = this.#textManager.getSeparatedWordsByCamelCaseString(tagWithoutSpecialCharacters);

                additionalTag = tagWithSeparatedWords;
            }

            // Collect the derived additional tag if any was produced.
            if (additionalTag) {
                additionalTags.push(additionalTag);
            }
        }

        return additionalTags;
    }
}