class ActionBlockView {
  constructor(
    action_name_enum,
    content_type_description_by_action,
    action_description_by_action_name,
    fileManager,
    textManager,
    dropdownManager
  ) {
    this.action_name_enum = action_name_enum;
    this.contentTypeDescriptionByAction =
      content_type_description_by_action;
    this.action_description_by_action_name = action_description_by_action_name;

    this.fileManager = fileManager;
    this.textManager = textManager;
    this.dropdownManager = dropdownManager;

    this.#init();
    this.setEventListeners();
  }

  #init() {
    const dropdown_select_action_for_create_container = $(
      "#settings_actionBlock_container"
    ).find(".dropdown_select_action")[0];
    this.dropdownManager.setOptions(
      dropdown_select_action_for_create_container,
      this.action_description_by_action_name
    );
    const i_action = 0;
    const first_dropdown_item_text_for_create =
      dropdown_select_action_for_create_container[i_action].value;
    const content_type_description =
      this.contentTypeDescriptionByAction[
        first_dropdown_item_text_for_create
      ];
  }

  addOnPage(
    id,
    actionBlock,
    parentElement = $(".actionBlocks_container").first(),
    isEditable = true
  ) {
    if (!id) id = "n";
    const actionBlockHTML = this.#createHTMLContainerActionBlock(
      id,
      actionBlock,
      isEditable
    );

    // Add ActionBlock to parent element.
    parentElement.append(actionBlockHTML);
    // Search for last actionBlock.
    const actionBlockContainer = parentElement.children().last();

    return actionBlockContainer;
  }

  updatePreview() {
    // // console.log('Update preview');
    const actionBlockPreview = {
      title: $("#settings_actionBlock_container").find(".input_field_title")[0]
        .value,
      imageURL: $("#settings_actionBlock_container").find(
        ".input_field_image_URL"
      )[0].value,
    };

    // Set default values.
    $("#actionBlock-preview").find(".title")[0].innerText = "";
    $("#actionBlock-preview").find(".img").removeAttr("src");

    $("#actionBlock-preview").find(".title")[0].innerText =
      actionBlockPreview.title;

    if (actionBlockPreview.imageURL)
      $("#actionBlock-preview")
        .find(".img")
        .attr("src", actionBlockPreview.imageURL);
  }

  showActionBlocksContainer() {
    $(".actionBlocks_container").show();
    $("#welcome_page").hide();
    // Show search area with Info-Blocks.
    this.showPage();
    $("#fixed_btn_plus").show();

    return [];
  }

  hideActionBlocksContainer() {
    $(".actionBlocks_container").hide();
  }

  showSettingsToCreateActionBlock(actionName) {
    $("#btn_close").show();
    $("#elements_to_create_action-block").show();
    $("#settings_actionBlock_container").show();
    $("#btn_create_actionBlock_with_automation").show();
    $("#btn_create_actionBlock").show();
    $(".btn_update_actionBlock").hide();
    $("#btn_delete_actionBlock").hide();
    $("#settings_actionBlock_container").find(".input_field_title")[0].focus();
    $("#btn_back").show();

    if (actionName) {
      const settingsActionBlockContainer = $(
        "#settings_actionBlock_container"
      );
      settingsActionBlockContainer
        .find(".dropdown_select_action")
        .val(actionName);
      $("#title_action_descritption").text(
        this.contentTypeDescriptionByAction[actionName]
      );
    }

    this.updatePreview();

    return [];
  }

  showElementsToEditActionBlock(actionBlock) {
    const settingsActionBlockContainer = $("#settings_actionBlock_container");
    let actionNameOfActionBlock = actionBlock.action;
    if (actionNameOfActionBlock === "showAlert")
      actionNameOfActionBlock = this.action_name_enum.showInfo;
    if (actionNameOfActionBlock === "openUrl")
      actionNameOfActionBlock = this.action_name_enum.openURL;

    $("#btn_close").show();
    $("#elements_to_edit_actionBlock").show();
    settingsActionBlockContainer.show();
    $("#elements_for_delete_infoBlock").show();
    settingsActionBlockContainer.find(".input_field_title")[0].focus();

    $(".btn_open_command_palette").hide();
    $("#btn_create_actionBlock").hide();
    $("#btn_create_actionBlock_with_automation").hide();
    $(".btn_update_actionBlock").show();
    $("#btn_delete_actionBlock").show();

    // Set value title.
    settingsActionBlockContainer.find(".input_field_title")[0].value =
      actionBlock.title;

    let tags = "";

    // Set value tags
    for (const indexTag in actionBlock.tags) {
      tags += actionBlock.tags[indexTag];
      if (indexTag < actionBlock.tags.length - 1) {
        tags += ", ";
      }
    }

    settingsActionBlockContainer.find(".input_field_tags")[0].value = tags;

    // Set value dropdown.
    $("#settings_actionBlock_container")
      .find(".type_actionBlock_container")
      .show();
    settingsActionBlockContainer
      .find(".dropdown_select_action")
      .val(actionNameOfActionBlock);
    // console.log('dropdown select action', settings_actionBlock_container.find('.dropdown_select_action').val());
    // DropDown to choose action of Action-Block hide.

    // Set value content.
    settingsActionBlockContainer.find(".input_field_content")[0].value =
      actionBlock.content;

    // Set value image path.
    settingsActionBlockContainer.find(".input_field_image_URL")[0].value =
      actionBlock.imageURL;

    if (
      settingsActionBlockContainer.find(".input_field_image_URL")[0].value ===
      "undefined"
    ) {
      settingsActionBlockContainer.find(".input_field_image_URL")[0].value =
        "";
    }

    const titlesElements = $(".title_actionBlock");

    for (const titleElem of titlesElements) {
      titleElem.innerText = actionBlock.title;
    }

    this.updatePreview();
    this.#onDropdownActionValueChange();

    return [];
  }

  // showElementsForVoiceRecognitionManager() {
  //     $('#elements_for_voice_recognition_settings').show();
  // }

  showElementsForFileManager() {
    $("#elements_for_file_manager").show();
  }

  onShowMainPage() {
    // Show button to add ActionBlock.
    $("#fixed_btn_plus").show();
    $("#btn_create_default_actionBlocks").hide();
    $("#btn_back").hide();
    $("#btn_close").hide();
    $(".btn_open_command_palette").hide();
  }

  onOpenMainPageWithoutActionBlocks() {
    this.hidePage();
    $("#welcome_page").show();
  }

  onOpenMainPageWithActionBlocks() {
    $("#welcome_page").hide();
    // Show search area with Info-Blocks.
    this.showPage();
  }

  updatePage() {
    $("#input_field_request")[0].value = "";
  }

  onPageContentChange() {
    const icon_plus = document.querySelector(".ico-btn");

    // Hide button to add ActionBlock.
    $("#fixed_btn_plus").hide();

    this.hidePage();
    $("#btn_back").show();
  }

  showFixedBtnPlus() {
    $("#fixed_btn_plus").show();
  }

  hideFixedBtnPlus() {
    $("#fixed_btn_plus").hide();
  }

  showContentOfActionBlock() {
    // this.hidePage();
    $("#content_executed_from_actionBlock").show();
  }

  clear() {
    // Clear infoblocks.
    $(".actionBlocks_container")[0].innerHTML = "";
  }

  setEventListeners() {
    const that = this;

    $("#settings_actionBlock_container")
      .find(".input_field_title")
      .on("input", () => this.updatePreview());
    $("#settings_actionBlock_container")
      .find(".input_field_image_URL")
      .on("input", () => this.updatePreview());

    $(".btn_save").on("click", () => {
      $("#btn_back").hide();
    });

    // On change value of dropdown to choose action.
    $("#settings_actionBlock_container").find(
      ".dropdown_select_action"
    )[0].onchange = function () {
      that.#onDropdownActionValueChange();
    };

    $("#dialog_upload_actionBloks_from_file")
      .find(".btn_cancel")[0]
      .addEventListener("click", function () {});
  }

  bindClickBtnCancelSettings(handler) {
    const btn_cancel_settings = $("#settings_actionBlock_container").find(
      "#btn_cancel"
    );

    btn_cancel_settings.on("click", () => {
      this.closeSettings();
      handler();
    });
  }

  bindClickActionBlock(
    actionBlockClickHandler,
    settingsActionBlockClickHandler
  ) {
    let is_mouse_enter_settings = false;

    const settings_container = $(".infoBlock").find(".settings");

    if (settings_container) {
      settings_container.mouseenter(function () {
        is_mouse_enter_settings = true;
      });
      settings_container.mouseleave(function () {
        is_mouse_enter_settings = false;
      });
      settings_container.on("click", onClickBtnShowSettings);

      function onClickBtnShowSettings(e) {
        // var title = $(this).closest('.infoBlock').attr('value');
        // var title = $(this).closest('.infoBlock').closest('.title').val();
        const title = $(this).closest(".infoBlock").find(".title").text();
        // console.log('onClickBtnShowSettings', title);
        settingsActionBlockClickHandler(title);
      }
    }

    $(".infoBlock").unbind("click");

    $(".infoBlock").on("click", function () {
      if (is_mouse_enter_settings) return false;
      // const title = $(this).attr('value');
      const title = $(this).text();

      actionBlockClickHandler(title);
    });
  }

  bindClickBtnRewriteActionBlocks(handler) {
    $("#dialog_upload_actionBloks_from_file")
      .find(".btn_rewrite_actionBlocks")[0]
      .addEventListener("click", function () {
        handler();
      });
  }

  bindClickBtnFixedPlus(handler) {
    $("#fixed_btn_plus").on("click", () => {
      $("#welcome_page").hide();
      $("#btn_scroll_up").hide();
      handler();
    });
  }

  showListOfTypeActionBlocksToCreate() {
    $("#list_of_type_actionBlocks_to_create").show();
  }

  hideListOfTypeActionBlocksToCreate() {
    $("#list_of_type_actionBlocks_to_create").hide();
  }

  bindClickBtnShowSettingsToCreateNote(handler) {
    $("#btn_settings_to_create_note").on("click", () => {
      this.hideSettingsContainer();
      handler();
    });
  }

  bindClickBtnShowSettingsToCreateLink(handler) {
    $("#btn_settings_to_create_link").on("click", () => {
      this.hideSettingsContainer();
      handler();
    });
  }

  bindClickBtnShowSettingsToCreateFolder(handler) {
    $("#btn_settings_to_create_folder").on("click", () => {
      this.hideSettingsContainer();
      handler();
    });
  }

  bindClickBtnShowSettingsToCreateAdvancedActionBlock(handler) {
    $("#btn_settings_to_create_advanced_action-block").on("click", () => {
      // DropDown to choose action of Action-Block show.
      $("#settings_actionBlock_container")
        .find(".type_actionBlock_container")
        .show();
      $("#btn_create_default_actionBlocks").show();
      handler();
    });
  }

  hideSettingsContainer() {
    $("#settings_actionBlock_container")
      .find(".type_actionBlock_container")
      .hide();
  }

  bindClickBtnCreateActionBlock(handler) {
    $("#btn_create_actionBlock").on("click", () => {
      const settings_actionBlock_container = $(
        "#settings_actionBlock_container"
      );

      // Get title value.
      const input_field_title =
        settings_actionBlock_container.find(".input_field_title");
      let title = this.textManager.getTextInOneLine(input_field_title.val());

      // Get content.
      const input_field_info_container = settings_actionBlock_container.find(
        ".input_field_content"
      );
      let content = input_field_info_container.val();

      if ( ! title) {
        if (content === "") {
          alert("Impossible to create Action-Block. Title field is empty");
          return false;
        }

        const first_line_content = this.textManager.getFirstLine(content);
        const first_ten_words_of_first_line_content = this.textManager.getWords(
          first_line_content,
          0,
          10
        );

        title = first_ten_words_of_first_line_content;
      }

      // .Start tags.
      // Get tags values.
      let input_field_tags =
        settings_actionBlock_container.find(".input_field_tags")[0];
      let tags_from_field = input_field_tags.value;

      let tags_plus_title = "";

      if (tags_from_field) tags_plus_title += tags_from_field + ", ";

      // Add new tag getting text from title.
      tags_plus_title += title;
      // .End tags.

      // Get action.
      //let selected_action = settings_actionBlock_container.find('.dropdown_select_action').find(':selected')[0];
      //let action_user_choose = selected_action.value;

      // infoBlockModel.action_for_new_actionBlock = $('.dropdown_select_action').find(':selected')[0].value;

      // if (infoBlockModel.action_for_new_actionBlock === undefined || infoBlockModel.action_for_new_actionBlock === null) {
      //     infoBlockModel.action_for_new_actionBlock = $('.dropdown_select_action').find(':selected')[0].value;

      //     if (infoBlockModel.action_for_new_actionBlock === undefined || infoBlockModel.action_for_new_actionBlock === null) {
      //         alert('Impossible to create command.\nProbably dropdown menu for action has been broken.');
      //     }

      //     return false;
      // }

      if (content === "") {
        // infoBlockModel.action_for_new_actionBlock = action_name.showInfo;
        content = title;
        // alert('Impossible to create command. content field for action is empty');
        // return false;
      }

      const input_field_image_URL_container =
        settings_actionBlock_container.find(".input_field_image_URL");
      const image_URL = input_field_image_URL_container.val();

      handler(title, tags_plus_title, this.getUserAction(), content, image_URL);
    });
  }

  bindClickBtnCreateActionBlockWithAutomation(handler) {
    $("#btn_create_actionBlock_with_automation").on("click", () => {
      const settings_actionBlock_container = $(
        "#settings_actionBlock_container"
      );

      // Get title value.
      const input_field_title =
        settings_actionBlock_container.find(".input_field_title");
      let title = this.textManager.getTextInOneLine(input_field_title.val());

      // Get content.
      const input_field_info_container = settings_actionBlock_container.find(
        ".input_field_content"
      );
      let content = input_field_info_container.val();

      if (!title) {
        if (content === "") {
          alert("Impossible to create Action-Block. Title field is empty");
          return false;
        }

        const first_line_content = this.textManager.getFirstLine(content);
        const first_ten_words_of_first_line_content = this.textManager.getWords(
          first_line_content,
          0,
          10
        );

        title = first_ten_words_of_first_line_content;
      }

      // .Start tags.
      // Get tags values.
      let input_field_tags =
        settings_actionBlock_container.find(".input_field_tags")[0];
      let tags_from_field = input_field_tags.value;

      let tags_plus_title = "";

      if (tags_from_field) tags_plus_title += tags_from_field + ", ";

      // Add new tag getting text from title.
      tags_plus_title += title;
      // .End tags.

      // Get action.
      //let selected_action = settings_actionBlock_container.find('.dropdown_select_action').find(':selected')[0];
      //let action_user_choose = selected_action.value;

      // infoBlockModel.action_for_new_actionBlock = $('.dropdown_select_action').find(':selected')[0].value;

      // if (infoBlockModel.action_for_new_actionBlock === undefined || infoBlockModel.action_for_new_actionBlock === null) {
      //     infoBlockModel.action_for_new_actionBlock = $('.dropdown_select_action').find(':selected')[0].value;

      //     if (infoBlockModel.action_for_new_actionBlock === undefined || infoBlockModel.action_for_new_actionBlock === null) {
      //         alert('Impossible to create command.\nProbably dropdown menu for action has been broken.');
      //     }

      //     return false;
      // }

      if (content === "") {
        // infoBlockModel.action_for_new_actionBlock = action_name.showInfo;
        content = title;
        // alert('Impossible to create command. content field for action is empty');
        // return false;
      }

      const input_field_image_URL_container =
        settings_actionBlock_container.find(".input_field_image_URL");
      const image_URL = input_field_image_URL_container.val();

      handler(title, tags_plus_title, this.getUserAction(), content, image_URL);
    });
  }

  getUserAction() {
    return $(".dropdown_select_action").find(":selected")[0].value;
  }

  clearAllSettingsFields() {
    // Clear all fields.
    $("#settings_actionBlock_container").find(".resize_field").val("");
  }

  bindClickBtnCreateDefaultActionBlocks(handler) {
    $("#btn_create_default_actionBlocks").on("click", () => {
      this.closeSettings();
      handler();
    });
  }

  bindClickBtnSaveEditedActionBlock(handler) {
    $(".btn_update_actionBlock").on("click", () => {
      // Get new title value.
      const input_field_title = $("#settings_actionBlock_container").find(
        ".input_field_title"
      );
      let title = input_field_title.val();

      if (!title) {
        alert("ERROR! Empty field for title");
        return;
      }

      // Get tags values
      const input_field_tags = $("#settings_actionBlock_container").find(
        ".input_field_tags"
      )[0];
      const tags_from_input_field = input_field_tags.value;
      let tags = tags_from_input_field;

      /*
            // Change all new lines to symbol ","
            let tags_without_new_line = tags_with_title.replaceAll('\n', ',');
            tags_without_new_line = tags_without_new_line.toLowerCase();
            tags = textManager.getArrayByText(tags_without_new_line);
            
        
            // Delete empty symbols from sides in text.
            for (const i_tag in tags) {
                tags[i_tag] = tags[i_tag].trim();
                // console.log(tags[i_tag]);
            }
            // console.log('tags array", tags);
        
            // Delete same tags.
            let tags_set = new Set(tags);
            // console.log('tags_set", tags_set);
            
            tags = Array.from(tags_set);
            // console.log('tags array from set", tags);
            */

      // Action.
      const dropdown_select_action_for_update = $(
        "#settings_actionBlock_container"
      ).find(".dropdown_select_action");
      // Get selected action.
      const selected_action =
        dropdown_select_action_for_update.find(":selected")[0].value;

      if (selected_action === undefined || selected_action === null) {
        alert(
          "Impossible to create command. Dropdown action_user_choose = undefined"
        );
        return false;
      }

      // Get content.
      const input_field_info_container = $(
        "#settings_actionBlock_container"
      ).find(".input_field_content");
      const content = input_field_info_container.val();

      if (!content) {
        alert("Impossible to create command. Action input field is empty");
        return false;
      }

      // Get image URL.
      const input_field_image_URL_container = $(
        "#settings_actionBlock_container"
      ).find(".input_field_image_URL");
      const image_url = input_field_image_URL_container.val();

      handler(title, tags, selected_action, content, image_url);
    });
  }

  bindClickBtnSaveQuicklyEditedActionBlock(handler) {
    $("#btn_quick_update_actionBlock").on("click", () => {
      // Get new title value.
      const note_title_element = $("#content_executed_from_actionBlock").find(
        ".note_title"
      );

      let title = note_title_element.text();

      if ( ! title) {
        alert("ERROR! Empty field for title.");
        return;
      }

      // Get content.
      const note_content_element = $("#content_executed_from_actionBlock").find(
        ".content"
      );
      const content = note_content_element.text();

      if ( ! content) {
        alert("ERROR! Content is wrong.");
        return false;
      }

      $('#content_executed_from_actionBlock .content').attr('contenteditable', 'false');
    
      $('#content_executed_from_actionBlock .note_title').attr('contenteditable', 'false');
      
      handler({title: title, content: content});
    });
  }

  bindClickBtnOpenActionBlockSettings(handler) {
    $(".btn_open_settings_actionBlock").on("click", () => {
      // Clear executed content.
      $("#content_executed_from_actionBlock").hide();

      const title = $("#content_executed_from_actionBlock")
        .find(".title")
        .text();

      handler(title);
    });
  }

  bindClickBtnDeleteActionBlock(handler) {
    $("#btn_delete_actionBlock").on("click", () => {
      const title = $("#elements_to_edit_actionBlock").find(
        ".title_actionBlock"
      )[0].innerText;
      handler(title);
    });
  }

  setDefaultValuesForSettingsElementsActionBlock() {
    const settings_actionBlock_container = $("#settings_actionBlock_container");

    // Get title value
    let input_field_title =
      settings_actionBlock_container.find(".input_field_title");
    input_field_title.val("");

    let input_field_info_container = settings_actionBlock_container.find(
      ".input_field_content"
    );
    input_field_info_container.val("");

    let input_field_tags =
      settings_actionBlock_container.find(".input_field_tags")[0];
    input_field_tags.value = "";

    settings_actionBlock_container.find(".input_field_image_URL").val("");
    // INPUT_FIELD_IMAGE_URL_CONTAINER.val('');
  }

  closeSettings() {
    const elementsForExecutedActionBlockArray =
      document.getElementsByClassName("elements_for_executed_actionBlock");

    for (const elementsForExecutedActionBlock of elementsForExecutedActionBlockArray) {
      elementsForExecutedActionBlock.style.display = "none";
    }

    this.setDefaultValuesForSettingsElementsActionBlock();
    // Clear executed content.
    $("#content_executed_from_actionBlock").hide();

    // Clear all input fields.
    this.clearAllSettingsFields();

    // Also close modal box (by standart logic of API).

    $("#btn_close").hide();
    $(".btn_open_command_palette").hide();
    $("#btn_back").hide();
  }

  isActionBlocksPageActive() {
    return $("#actionBlocks_page").is(":visible");
  }

  showAlert(content, title) {
    let dialogInfoElem = $("#dialog_info");
    $(".black_background").show();
    // Hide search area with Action-Blocks.
    this.hidePage();

    if (typeof dialogInfoElem[0].showModal === "function") {
      dialogInfoElem[0].showModal();

      if (title) {
        // Set title of infoBlock.
        dialogInfoElem.find(".title")[0].innerText = title;
      }

      // Set content.
      dialogInfoElem.find(".text_info")[0].innerText = content;

      $(".black_background").show();
    } else {
      alert(content);
      // console.log('WARNING! The <dialog> API is not supported by this browser');
    }
  }

  hidePage() {
    $("#actionBlocks_page").hide();
  }

  showPage() {
    $("#actionBlocks_page").show();
  }

  rotateFixedBtnPlus() {
    const icon_plus = document.querySelector(".ico-btn");
    icon_plus.classList.toggle("is-active");
  }

  #createHTMLContainerActionBlock = function (
    id,
    actionBlock,
    isEditable = true
  ) {
    const title = actionBlock.title;
    const isFolder = actionBlock.action === this.action_name_enum.openFolder;
    let imageURL = actionBlock.imageURL;

    this.infoBlock_container;

    let titleHTML = "";

    if (!id) {
      // console.log('ERROR! Id must be defined to create infoBlock');
      return;
    }

    if (title != undefined) {
      titleHTML = '<div class="title">' + title + "</div>";
    }

    let imgDivHtml = "";
    let folderElem = "";
    let isPaddingTop = false;
    const settingsHTML =
      '<div class="settings"><div class="icon"></div></div>';

    if (imageURL) {
      imgDivHtml = '<img class="img" src="' + imageURL + '">';
    } else {
      imageURL = "";
      imgDivHtml = '<img class="img">';
    }
    /*
        else {
            isPaddingTop = true;
        }
        */

    if (isFolder) {
      folderElem = '<div class="folder"></div>';
    }

    const idHTML = "infoBlock" + id; // title.replaceAll(' ', '_');

    let perspectiveContainerHTML =
      '<div id="' + idHTML + '" class="perspective_img_effect_container">';

    let firstPartActionBlockHTML = "";

    firstPartActionBlockHTML =
      '<div id="' +
      idHTML +
      '" name="' +
      title +
      '" class="infoBlock" value="' +
      id +
      '">';

    // Set padding from settings button.
    /*
        if (isPaddingTop) {
            firstPartActionBlockHTML = '<div id="' + idHTML +  '" class="infoBlock" style="padding-top:30px">';
        }
        else {
            firstPartActionBlockHTML = '<div id="' + idHTML +  '" class="infoBlock">';
        }
        */

    if (isEditable) {
      this.actionBlockHTML =
        firstPartActionBlockHTML +
        folderElem +
        settingsHTML +
        imgDivHtml +
        titleHTML +
        "</div>";
    } else {
      this.actionBlockHTML =
        firstPartActionBlockHTML +
        folderElem +
        imgDivHtml +
        titleHTML +
        "</div>";
    }

    return this.actionBlockHTML;
  };

  #onDropdownActionValueChange() {
    let dropdown = $("#settings_actionBlock_container").find(
      ".dropdown_select_action"
    );
    const selectedAction = dropdown.find(":selected")[0];
    $("#title_action_descritption").text(
      this.contentTypeDescriptionByAction[selectedAction.value]
    );
  }
}
