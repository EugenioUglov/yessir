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

    // function onSelect() {
    //   if (
    //     that.hashObserver.getCurrentPageName() ===
    //     HASH_NAME_ENUM.main
    //   ) {
    //     window.scrollTo(0, 0);
    //     const actionBlocksToShow =
    //       that.controller.getActionBlocksByPhrase(
    //         $("#input_field_request").val()
    //       );
    //     that.controller.showActionBlocks(actionBlocksToShow);
    //   }
    // }
  }

  applyAutocompleteItems(inputField, items, callbackSelect) {
    this.#model.applyAutocompleteItems(
      inputField,
      items,
      callbackSelect
    );
  }
}
