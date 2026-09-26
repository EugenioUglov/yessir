class optionsForInputFieldWithSuggestions {
    #options = [];

    
    addOption({title, clickHandler, description, tags, icon}) {
        const option = {};

        option.title = title;
        option.clickHandler = clickHandler;
        option.description = description;
        option.tags = tags;
        option.icon = icon;

        this.#options.push(option);
    }

    getOptions() {
        return this.#options;
    }
}