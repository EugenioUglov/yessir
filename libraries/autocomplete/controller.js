class AutocompleteController {
  constructor(model, onSelect) {
    this.#model = model;
    this.#onSelect = onSelect;
  }

  #model = model;
  #onSelect = onSelect;

  bindApplyTags({ inputFieldsForAutocomplete, items}) {
    const that = this;

    applyTagsAutocompleteForInputFields(inputFieldsForAutocomplete);

    function applyTagsAutocompleteForInputFields(
      inputFieldsForAutocomplete
    ) {
      for (const inputField of inputFieldsForAutocomplete) {
        that.applyAutocompleteItems(inputField, items, this.#onSelect);
      }
    }
  }

  applyAutocompleteItems(inputField, items, callbackSelect) {
    this.#model.applyAutocompleteItems(
      inputField,
      items,
      callbackSelect
    );
  }
}
