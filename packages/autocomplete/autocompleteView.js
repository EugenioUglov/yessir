class AutocompleteView {
    constructor() {
        
    }

    bindApplyTags(handler) {
        const inputFieldRequest = $('#input_field_request');
        const inputFieldTagsOnSettingActionBlock = $('.input_field_tags');
        const inputFieldPlusTags = $('#search_by_tags_container').find('.input_field_plus_tags');
        const inputFieldMinusTags = $('#search_by_tags_container').find('.input_field_minus_tags');
    
        const inputFieldsForAutocomplete = [inputFieldRequest, inputFieldTagsOnSettingActionBlock, 
            inputFieldPlusTags, inputFieldMinusTags];

        handler(inputFieldsForAutocomplete);
    }
}