class AutocompleteController {
  constructor(hashObserver, actionBlockController, autocompleteService) {
    this.autocompleteService = autocompleteService;
    this.view = new AutocompleteView();
    this.hashObserver = hashObserver;
    this.actionBlockController = actionBlockController;
  }

  bindApplyTags() {
    const that = this;

    /* Get tags */
    if ( ! localStorage["indexes_actionBlocks_by_tag"]) {
      return;
    }

    const indexesActionBlocksByTag = JSON.parse(
      localStorage["indexes_actionBlocks_by_tag"]
    );
    const tags = Object.keys(indexesActionBlocksByTag);

    this.view.bindApplyTags(applyTagsAutocompleteForInputFields);

    function applyTagsAutocompleteForInputFields(
      inputFieldsForAutocomplete
    ) {
      for (const inputField of inputFieldsForAutocomplete) {
        that.applyTagsAutocomplete(inputField, tags, onSelect);
      }
    }

    function onSelect() {
      if (
        that.hashObserver.getCurrentPageName() ===
        HASH_NAME_ENUM.main
      ) {
        window.scrollTo(0, 0);
        const actionBlocksToShow =
          that.actionBlockController.getActionBlocksByPhrase(
            $("#input_field_request").val()
          );
        that.actionBlockController.showActionBlocks(actionBlocksToShow);
      }
    }
  }

  applyTagsAutocomplete(inputField, tags, callbackSelect) {
    this.autocompleteService.applyTagsAutocomplete(
      inputField,
      tags,
      callbackSelect
    );
  }
}
