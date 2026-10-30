class DefaultActionBlocks {
    constructor() {

    }

    getDefaultActionBlocks() {
        const actionBlock_set_synonym_tags  = {
            title: 'Set synonym tags',
            tags: 'Set synonym tags, default',
            action: 'showHTML',
            content: getContentActionBlockSetSynonymTags(),
            imageURL: 'https://cdn-icons-png.flaticon.com/512/18676/18676617.png'
        };
        
        const actionBlock_set_children_tags  = {
            title: 'Set children tags',
            tags: 'Set children tags, default',
            action: 'showHTML',
            content: getContentActionBlockSetChildrenTags(),
            imageURL: 'https://cdn-icons-png.flaticon.com/512/686/686887.png'
        };

        const actionBlock_create = {
            title: 'Create Action-Block',
            tags: 'Create Action-Block, default',
            action: 'showHTML',
            content: '<script>yesSir.actionBlockController.showSettingsToCreateActionBlock()</script>',
            imageURL: 'https://i.ibb.co/K6kqJQc/plus.png'
        };

        const actionBlock_create_note = {
          title: "Create a note by voice",
          tags: "Create a note by voice, create note, voice recognition, default",
          action: "showHTML",
          content: getContentActionBlockCreateNote(),
          imageURL: "https://i.ibb.co/K6kqJQc/plus.png",
        };
        
        const actionBlock_open_file_manager = {
            title: 'Open File Manager',
            tags: 'Open File manager, save, upload, download, file, default',
            action: 'showHTML',
            content: getContentActionBlockOpenFileManager(),
            imageURL: 'https://icon-library.com/images/file-download-icon/file-download-icon-19.jpg'
        };

        const actionBlock_save_to_file = {
            title: 'Save Action-Blocks to file',
            tags: 'Save Action-Blocks to file, download',
            action: 'showHTML',
            content: '<script>yesSir.actionBlockWrapper.downloadFileWithActionBlocks();</script>',
            imageURL: 'https://www.clipartmax.com/png/full/468-4684948_floppy-disk-comments-floppy-disk-comments.png'
        };
    
        const actionBlock_delete_all_actionBlocks = {
          title: "Delete all Action-Blocks",
          tags: "Delete all Action-Blocks, Remove, clear",
          action: "showHTML",
          content: getContentActionBlockDeleteAllActionBlocks(),
          imageURL:
            "https://pngimg.com/uploads/trash_can/trash_can_PNG18457.png",
        };

        const actionBlock_open_speeh_assistant = {
            title: 'Open speech assistant',
            tags: 'Open speech assistant, voice recognition',
            action: 'showHTML',
            content: getContentActionBlockSpeechAssistant(),
            imageURL: 'https://images.assetsdelivery.com/compings_v2/rashadashurov/rashadashurov1911/rashadashurov191100457.jpg'
        };
    
        const actionBlock_open_data_storage_manager = {
          title: "Open Data Storage Manager",
          tags: "Open Data Storage Manager, localstorage, database, default",
          action: "showHTML",
          content:
            "<script>yesSir.dataStorageService.showDataStorageSettings()</script>",
          imageURL:
            "https://www.sostechgroup.com/wp-content/uploads/2016/08/ThinkstockPhotos-176551504.jpg",
        };
    
        const actionBlock_email_of_developer = {
          title: "Write email to developer - eugeniouglovsupport@gmail.com",
          tags: "Write email to developer, contact, message, gmail, mail, default",
          action: "openURL",
          content: "mailto:eugeniouglovsupport@gmail.com",
          imageURL: "https://i.ibb.co/dMHPk78/DEVELOPER-gmail.png",
        };
    
        const actionBlock_logs = {
          title: "Show logs",
          tags: "Show logs, default",
          action: "showHTML",
          content:
            "<script>yesSir.logsService.showContainerWithLogs()</script>",
          imageURL:
            "https://pbs.twimg.com/profile_banners/240696823/1528203940/1500x500",
        };
    
        const actionBlock_voiceRecognitionSettings = {
            title: 'Open voice recognition settings',
            tags: 'voice recognition, default',
            action: 'showHTML',
            content: '<script>yesSir.voiceRecognitionService.showSettings()</script>',
            imageURL: 'https://walkthechat.com/wp-content/uploads/2015/02/voice-recognition.jpg'
        };

        const actionBlock_login = {
            title: 'Login',
            tags: 'login, register, database, default',
            action: 'showHTML',
            content: getContentActionBlockLogin(),
            imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcjwBjErg0BEdVO88E6_a4KxB-3nsdwn41NQ&usqp=CAU'
        };

        const actionBlock_get_from_database = {
            title: 'Get from database in Live',
            tags: 'get from database in Live, default',
            action: 'showHTML',
            content: getContentActionBlockGetFromDatabase(),
            imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS647trQFxA8PHI7gxQuuC5kM_IGkD6u65N7CHyhTFToOP-RBhlXE0F_ZBw3GIkXk3mOpA&usqp=CAU'
        };

        const actionBlock_save_to_database = {
            title: 'Save Action-Blocks to database',
            tags: 'Save Action-Blocks to database, default',
            action: 'showHTML',
            content: getContentActionBlockSaveToDatabase(),
            imageURL: 'https://static.vecteezy.com/system/resources/previews/015/433/950/original/database-save-illustration-on-a-background-premium-quality-symbols-icons-for-concept-and-graphic-design-vector.jpg'
        };

        const default_actionBlocks = [
            // actionBlock_create,
            // actionBlock_create_note,
            actionBlock_set_synonym_tags,
            actionBlock_set_children_tags,
            actionBlock_email_of_developer,
            actionBlock_open_file_manager,
            actionBlock_save_to_file,
            actionBlock_delete_all_actionBlocks,
            // actionBlock_open_speeh_assistant,
            // actionBlock_login,
            actionBlock_get_from_database,
            actionBlock_save_to_database,
            // actionBlock_open_data_storage_manager,
            // actionBlock_logs,
            // actionBlock_voiceRecognitionSettings
        ];



        function getContentActionBlockOpenFileManager() {
            return `
                <style>
                    #elements_for_file_manager p {
                        font-size: 25px;
                        font-weight: bold;
                    }
                    #dlg_upload_ab {
                        position: fixed;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        z-index: 2000;
                        background: #ffffff;
                        border: 1px solid #999999;
                        border-radius: 10px;
                        padding: 24px;
                        width: 1100px;
                        max-width: 98%;
                        max-height: 90vh;
                        overflow-y: auto;
                        box-shadow: 0 4px 20px rgba(0,0,0,0.35);
                    }
                    #dlg_upload_ab h2 {
                        margin-top: 0;
                        margin-bottom: 15px;
                        font-size: 18px;
                    }
                    #dlg_upload_ab .dlg-group {
                        margin-bottom: 14px;
                    }
                    #dlg_upload_ab .dlg-radio {
                        display: block;
                        margin: 6px 0;
                        cursor: pointer;
                    }
                    #dlg_upload_ab .dlg-radio input[type="radio"] {
                        margin-right: 8px;
                    }
                    #dlg_upload_ab .conflict-item {
                        border: 1px solid #cccccc;
                        border-radius: 8px;
                        padding: 12px;
                        margin: 10px 0;
                        background: #fafafa;
                    }
                    #dlg_upload_ab .conflict-title {
                        font-weight: bold;
                        margin-bottom: 8px;
                        font-size: 14px;
                    }
                    #dlg_upload_ab .conflict-cols {
                        display: flex;
                        gap: 16px;
                    }
                    #dlg_upload_ab .conflict-col {
                        flex: 1;
                        min-width: 0;
                    }
                    #dlg_upload_ab .conflict-col b {
                        display: block;
                        margin-bottom: 6px;
                        font-size: 12px;
                        color: #555555;
                    }
                    #dlg_upload_ab .conflict-content {
                        white-space: pre-wrap;
                        font-family: monospace;
                        font-size: 12px;
                        padding: 10px;
                        background: #f8f9fa;
                        border-radius: 6px;
                        border: 1px solid #dddddd;
                        max-height: 280px;
                        overflow: auto;
                    }
                    #dlg_upload_ab .btn-apply {
                        margin-top: 16px;
                        padding: 10px 24px;
                        font-size: 14px;
                    }
                    #dlg_upload_ab .dlg-close {
                        position: absolute;
                        top: 12px;
                        right: 16px;
                        font-size: 24px;
                        line-height: 1;
                        color: #666666;
                        cursor: pointer;
                    }
                    #dlg_upload_ab .dlg-close:hover {
                        color: #000000;
                    }
                    #dlg_backup_ab {
                        position: fixed;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        z-index: 2100;
                        background: #ffffff;
                        border: 1px solid #999999;
                        border-radius: 10px;
                        padding: 24px;
                        width: 560px;
                        max-width: 92%;
                        box-shadow: 0 4px 20px rgba(0,0,0,0.35);
                    }
                    #dlg_backup_ab h2 {
                        margin-top: 0;
                        margin-bottom: 16px;
                        font-size: 18px;
                    }
                    #dlg_backup_ab .dlg-radio {
                        display: block;
                        margin: 10px 0;
                        cursor: pointer;
                    }
                    #dlg_backup_ab .dlg-radio input[type="radio"] {
                        margin-right: 8px;
                    }
                    #dlg_backup_ab .btn-row {
                        margin-top: 20px;
                        text-align: right;
                    }
                </style>
                
                <div id="elements_for_file_manager" class="elements_for_executed_actionBlock" padding-top: 50px;">
                <br><br>
            
                <div class="outline">
                    <p>Save Action-Blocks to the file</p>
                    <button class="btn_download_actionBlocks btn" title="Save Action-Blocks in the file">Download Action-Blocks file</button>
                    <br><br>
                </div>
                <br>
                <div class="outline">
                    <p>Upload file with Action-Blocks</p>
                    <div class="upload_commands_container">
                        <button type="file" class="btn" title="Upload file with Action-Blocks"><input class="btn_upload_actionBlocks" type="file" name="file" title=" ">
                        </button>
                    </div>
                </div>
                <br>
                </div>
                
                <!-- Dialog shown after uploading a file (hidden by default) -->
                <div id="dlg_upload_ab" style="display: none;">
                    <span id="dlg_upload_close_icon" class="dlg-close">&times;</span>
                    <h2 id="dlg_upload_title">Upload Action-Blocks from file</h2>
                    <div id="dlg_upload_options"></div>
                    <div id="dlg_upload_conflicts" style="display: none; margin-top: 10px; max-height: 420px; overflow-y: auto; border: 1px solid #ddd; padding: 10px; background: #fff;"></div>
                    <div style="margin-top: 16px; text-align: right;">
                        <button id="dlg_upload_apply" class="btn btn-apply">Apply</button>
                    </div>
                </div>

                <!-- Backup recommendation dialog (shown before applying upload) -->
                <div id="dlg_backup_ab" style="display: none;">
                    <h2>Backup recommended</h2>
                    <p style="margin-bottom: 16px;">It is recommended to download current Action-Blocks for backup before uploading.</p>
                    <label class="dlg-radio">
                        <input type="radio" name="dlg_backup_mode" value="download" checked> Download and continue
                    </label>
                    <label class="dlg-radio">
                        <input type="radio" name="dlg_backup_mode" value="skip"> Continue without downloading
                    </label>
                    <div class="btn-row">
                        <button id="dlg_backup_apply" class="btn btn-apply">Apply</button>
                        <button id="dlg_backup_cancel" class="btn">Cancel</button>
                    </div>
                </div>
                
                <script>
                (function() {
                    const $input = $('.btn_upload_actionBlocks');
                    const $dlg = $('#dlg_upload_ab');
                    const $dlgOptions = $('#dlg_upload_options');
                    const $dlgConflicts = $('#dlg_upload_conflicts');
                    const $dlgApply = $('#dlg_upload_apply');
                    const $dlgCloseIcon = $('#dlg_upload_close_icon');
                    const $dlgBackup = $('#dlg_backup_ab');
                    const $dlgBackupApply = $('#dlg_backup_apply');
                    const $dlgBackupCancel = $('#dlg_backup_cancel');
                    let fileBlocks = []; // array of action blocks from the uploaded file

                    function resetInput() {
                        // Give possibility to load the same file again.
                        $input[0].value = '';
                    }

                    function hideDialog() {
                        $dlg.hide();
                        resetInput();
                        window.location.hash = 'main';
                    }

                    $input.off('change').on('change', (event) => {
                        yesSir.fileManager.uploadFile(onFileLoaded);

                        function onFileLoaded(content_of_file) {
                            if (content_of_file === undefined || content_of_file === null || content_of_file === '') {
                                alert('Error! Data from the file has not been loaded.');
                                resetInput();
                                return;
                            }

                            let parsed;
                            try {
                                parsed = yesSir.mapDataStructure.getParsed(content_of_file);
                            } catch (error) {
                                alert('Content of file is not correct. File must contain an Action-Blocks data.');
                                resetInput();
                                return;
                            }

                            // Normalize to an array of action blocks.
                            if (parsed instanceof Map) {
                                fileBlocks = Array.from(parsed.values());
                            } else if (Array.isArray(parsed)) {
                                fileBlocks = parsed;
                            } else {
                                // Single object.
                                fileBlocks = [parsed];
                            }

                            if (!fileBlocks || fileBlocks.length === 0) {
                                alert('File does not contain any Action-Blocks.');
                                resetInput();
                                return;
                            }

                            buildDialog(fileBlocks);
                        }
                    });

                    $('.btn_download_actionBlocks')[0].addEventListener('click', () => {
                        yesSir.actionBlockWrapper.downloadFileWithActionBlocks();
                    });

                    /**
                     * Build the upload confirmation dialog.
                     * 1. New blocks (no title conflict) are added automatically.
                     * 2. Blocks with same title but different content -> conflicts for user choice.
                     * 3. Blocks with same title and same content -> ignored (already present).
                     */
                    function buildDialog(fileBlocks) {
                        const currentMap = yesSir.actionBlockController.model.getActionBlocks();
                        const currentBlocks = currentMap instanceof Map ?
                            Array.from(currentMap.values()) :
                            currentBlocksFromObject(currentMap);

                        const currentByTitle = new Map();
                        currentBlocks.forEach(b => {
                            if (b && b.title) currentByTitle.set(b.title.toUpperCase(), b);
                        });

                        const newBlocks = [];
                        const conflicts = []; // { current, file }

                        fileBlocks.forEach(fb => {
                            if (!fb || !fb.title) return;
                            const cur = currentByTitle.get(fb.title.toUpperCase());
                            if (!cur) {
                                newBlocks.push(fb);
                            } else if (cur.content !== fb.content) {
                                conflicts.push({ current: cur, file: fb });
                            }
                            // else: identical title & content -> skip
                        });

                        // Title.
                        $('#dlg_upload_title').text('Upload Action-Blocks from file (' + fileBlocks.length + ' Action-Blocks)');

                        // Options (radio buttons).
                        const optionNew = '<label class="dlg-radio"><input type="radio" name="dlg_upload_mode" value="new" checked> Load only new Action-Blocks</label>';
                        const optionReplace = '<label class="dlg-radio"><input type="radio" name="dlg_upload_mode" value="replace"> Delete all previous and load new Action-Blocks</label>';
                        $dlgOptions.html(optionNew + optionReplace);

                        // Conflicts panel.
                        if (conflicts.length > 0) {
                            $dlgConflicts.show();
                            let html = '<p style="font-weight: bold; margin-bottom: 8px;">Found Action-Blocks with the same titles but different content. Choose which version to keep for each:</p>';
                            conflicts.forEach((c, idx) => {
                                html += '<div class="conflict-item" data-idx="' + idx + '">'
                                    + '<div class="conflict-title">Action-Block: ' + escapeHtml(c.current.title) + '</div>'
                                    + '<div class="conflict-cols">'
                                    + '<div class="conflict-col">'
                                    + '<b>Current in app:</b>'
                                    + '<div class="conflict-content">' + escapeHtml(String(c.current.content || '')) + '</div>'
                                    + '</div>'
                                    + '<div class="conflict-col">'
                                    + '<b>From uploaded file:</b>'
                                    + '<div class="conflict-content">' + escapeHtml(String(c.file.content || '')) + '</div>'
                                    + '</div>'
                                    + '</div>'
                                    + '<label class="dlg-radio"><input type="radio" name="conflict_' + idx + '" value="current"> Keep current</label>'
                                    + '<label class="dlg-radio"><input type="radio" name="conflict_' + idx + '" value="file" checked> Keep uploaded</label>'
                                    + '</div>';
                            });
                            html += '<div style="margin-top: 10px;">'
                                + '<button id="btn_conflicts_keep_current" class="btn">Keep all current</button> '
                                + '<button id="btn_conflicts_replace_all" class="btn">Replace all with uploaded</button>'
                                + '</div>';
                            $dlgConflicts.html(html);
                        } else {
                            $dlgConflicts.hide();
                            $dlgConflicts.empty();
                        }

                        // Mass conflict buttons.
                        $('#btn_conflicts_keep_current').off('click').on('click', () => {
                            $('input[name^="conflict_"]').each(function() {
                                this.checked = this.value === 'current';
                            });
                        });
                        $('#btn_conflicts_replace_all').off('click').on('click', () => {
                            $('input[name^="conflict_"]').each(function() {
                                this.checked = this.value === 'file';
                            });
                        });

                        // Show conflicts only when "Load only new Action-Blocks" is selected.
                        $('input[name="dlg_upload_mode"]').on('change', () => {
                            const mode = $('input[name="dlg_upload_mode"]:checked').val();
                            if (mode === 'new' && conflicts.length > 0) {
                                $dlgConflicts.show();
                            } else {
                                $dlgConflicts.hide();
                            }
                        });

                        // Apply / Close.
                        $dlgApply.off('click').on('click', () => {
                            // Hide upload dialog and show backup recommendation dialog.
                            $dlg.hide();
                            $dlgBackup.show();
                        });

                        // Backup dialog: Cancel -> return to upload dialog.
                        $dlgBackupCancel.off('click').on('click', () => {
                            $dlgBackup.hide();
                            $dlg.show();
                        });

                        // Backup dialog: Apply -> download (if selected) then apply upload.
                        $dlgBackupApply.off('click').on('click', () => {
                            const backupMode = $('input[name="dlg_backup_mode"]:checked').val();
                            $dlgBackup.hide();
                            $('.black_background').hide();

                            yesSir.modalLoadingController.show();

                            if (backupMode === 'download') {
                                // Download current Action-Blocks for backup first.
                                yesSir.actionBlockWrapper.downloadFileWithActionBlocks();
                            }

                            // Small delay so the download dialog / file save can start before reload.
                            setTimeout(() => {
                                applyUpload();
                            }, 300);
                        });

                        function applyUpload() {
                            const mode = $('input[name="dlg_upload_mode"]:checked').val();

                            let finalBlocksMap = new Map();

                            if (mode === 'replace') {
                                // Remove all current Action-Blocks and load new ones from file.
                                fileBlocks.forEach(fb => {
                                    if (!fb || !fb.title) return;
                                    finalBlocksMap.set(fb.title.toUpperCase(), normalizeBlock(fb));
                                });
                            } else {
                                // "Load only new Action-Blocks": keep current + add new + resolved conflicts.
                                currentBlocks.forEach(b => {
                                    if (b && b.title) finalBlocksMap.set(b.title.toUpperCase(), b);
                                });
                                // Add new blocks.
                                newBlocks.forEach(fb => {
                                    finalBlocksMap.set(fb.title.toUpperCase(), normalizeBlock(fb));
                                });
                                // Resolve conflicts.
                                conflicts.forEach((c, idx) => {
                                    const selected = $('input[name="conflict_' + idx + '"]:checked').val();
                                    const chosen = selected === 'file' ? c.file : c.current;
                                    finalBlocksMap.set(c.current.title.toUpperCase(), normalizeBlock(chosen));
                                });
                            }

                            // Convert Map to array and set.
                            const finalArray = Array.from(finalBlocksMap.values());
                            yesSir.actionBlockController.setActionBlocks(finalArray);
                            yesSir.scrollController.setPositionTop();
                            yesSir.actionBlockController.showActionBlocks();
                            yesSir.searchController.clear();
                            yesSir.modalLoadingController.hide();

                            // Reload page so Action-Blocks are fully refreshed.
                            window.location.reload();
                        }

                        $dlgCloseIcon.off('click').on('click', () => {
                            hideDialog();
                        });

                        // Show dialog over black background overlay.
                        $('.black_background').show();
                        $dlg.show();
                    }

                    function currentBlocksFromObject(obj) {
                        const arr = [];
                        if (!obj) return arr;
                        for (const k in obj) {
                            if (obj[k]) arr.push(obj[k]);
                        }
                        return arr;
                    }

                    function normalizeBlock(b) {
                        const nb = Object.assign({}, b);
                        if (nb.id === undefined) {
                            nb.id = crypto.randomUUID();
                        }
                        return nb;
                    }

                    function escapeHtml(text) {
                        if (!text) return '';
                        const div = document.createElement('div');
                        div.textContent = String(text);
                        return div.innerHTML;
                    }
                })();
            `;
        }

        function getContentActionBlockSetSynonymTags() {
            return `
                <style>
                    .synonyms-outer-wrapper {
                        display: flex;
                        justify-content: center;
                        width: 100%;
                    }
                    .synonyms-wrapper {
                        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                        width: 100%;
                        max-width: 550px;
                        color: #243b53;
                    }
                    .group-container {
                        background: #f8fafc;
                        border: 1px solid #e2e8f0;
                        border-radius: 12px;
                        padding: 12px;
                        margin-bottom: 15px;
                        position: relative;
                        animation: slideIn 0.2s ease-out;
                    }
                    .group-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 8px;
                        font-size: 12px;
                        font-weight: 600;
                        color: #64748b;
                        text-transform: uppercase;
                        letter-spacing: 0.025em;
                    }
                    .btn-remove-group {
                        background: #fee2e2;
                        color: #ef4444;
                        border: none;
                        border-radius: 6px;
                        padding: 2px 8px;
                        cursor: pointer;
                        font-size: 11px;
                        transition: background 0.2s;
                    }
                    .btn-remove-group:hover { background: #fecaca; }

                    .tag-container {
                        border: 2px solid #cbd5e1;
                        padding: 6px;
                        border-radius: 8px;
                        display: flex;
                        flex-wrap: wrap;
                        gap: 6px;
                        background: #fff;
                        min-height: 38px;
                    }
                    .tag-container:focus-within { border-color: #3b82f6; }

                    .tag {
                        background: #eff6ff;
                        color: #1e40af;
                        padding: 2px 8px;
                        border-radius: 4px;
                        font-size: 13px;
                        display: flex;
                        align-items: center;
                        border: 1px solid #bfdbfe;
                    }
                    .tag button {
                        background: none;
                        border: none;
                        color: #60a5fa;
                        margin-left: 5px;
                        cursor: pointer;
                        font-size: 16px;
                    }
                    .tag-input {
                        border: none;
                        outline: none;
                        flex-grow: 1;
                        font-size: 13px;
                        min-width: 100px;
                    }
                    .btn-add-group {
                        background: #3b82f6;
                        color: white;
                        border: none;
                        padding: 8px 16px;
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: 600;
                        width: 100%;
                        margin-top: 10px;
                        transition: opacity 0.2s;
                    }
                    .btn-add-group:hover { opacity: 0.9; }

                    @keyframes slideIn {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                </style>

                <div class="synonyms-outer-wrapper">
                    <div class="synonyms-wrapper">
                        <div id="groups-list"></div>
                        <button class="btn-add-group" onclick="addGroup()">+ Add synonym group</button>
                    </div>
                </div>

                <script>
                    (function() {
                        let synonymGroups = JSON.parse(localStorage.getItem('synonymTags')) || [[]];

                        function save() {
                            localStorage.setItem('synonymTags', JSON.stringify(synonymGroups));
                        }

                        window.renderGroups = () => {
                            const container = document.getElementById('groups-list');
                            container.innerHTML = '';

                            synonymGroups.forEach((group, gIndex) => {
                                const groupDiv = document.createElement('div');
                                groupDiv.className = 'group-container';
                                
                                groupDiv.innerHTML = \`
                                    <div class="group-header">
                                        <span>Group #\${gIndex + 1}</span>
                                        <button class="btn-remove-group" onclick="removeGroup(\${gIndex})">Delete group</button>
                                    </div>
                                    <div class="tag-container">
                                        <div id="tags-\${gIndex}" style="display: contents;"></div>
                                        <input type="text" class="tag-input" 
                                            placeholder="Enter synonyms separated by comma..." 
                                            onkeydown="handleKey(event, \${gIndex})"
                                            onblur="processInput(this.value, \${gIndex})">
                                    </div>
                                \`;
                                container.appendChild(groupDiv);

                                const list = groupDiv.querySelector(\`#tags-\${gIndex}\`);
                                group.forEach((tag, tIndex) => {
                                    const span = document.createElement('div');
                                    span.className = 'tag';
                                    span.innerHTML = \`\${tag}<button onclick="removeTag(\${gIndex}, \${tIndex})">&times;</button>\`;
                                    list.appendChild(span);
                                });
                            });
                        };

                        window.addGroup = () => {
                            synonymGroups.push([]);
                            renderGroups();
                            save();
                        };

                        window.removeGroup = (index) => {
                            synonymGroups.splice(index, 1);
                            renderGroups();
                            save();
                        };

                        window.handleKey = (e, gIndex) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                processInput(e.target.value, gIndex);
                                e.target.value = '';
                            }
                        };

                        window.processInput = (value, gIndex) => {
                            if (!value.trim()) return;
                            const newTags = value.split(',')
                                .map(t => t.trim())
                                .filter(t => t !== '' && !synonymGroups[gIndex].includes(t));
                            
                            if (newTags.length > 0) {
                                synonymGroups[gIndex].push(...newTags);
                                renderGroups();
                                save();
                            }
                        };

                        window.removeTag = (gIndex, tIndex) => {
                            synonymGroups[gIndex].splice(tIndex, 1);
                            renderGroups();
                            save();
                        };

                        renderGroups();
                    })();
                <\/script>
            `;
        }
    
        function getContentActionBlockSetChildrenTags() {
            return `
                <style>
                    .children-outer-wrapper {
                        display: flex;
                        justify-content: center;
                        width: 100%;
                    }
                    .children-tags-wrapper {
                        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                        width: 100%;
                        max-width: 550px;
                        color: #1a202c;
                    }
                    .parent-group {
                        background: #ffffff;
                        border: 1px solid #e2e8f0;
                        border-radius: 12px;
                        padding: 16px;
                        margin-bottom: 20px;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.04);
                        animation: fadeIn 0.2s ease-out;
                    }
                    .group-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 8px;
                        font-size: 12px;
                        font-weight: 600;
                        color: #64748b;
                        text-transform: uppercase;
                        letter-spacing: 0.025em;
                    }
                    .btn-remove-group {
                        background: #fee2e2;
                        color: #ef4444;
                        border: none;
                        border-radius: 6px;
                        padding: 2px 8px;
                        cursor: pointer;
                        font-size: 11px;
                        transition: background 0.2s;
                    }
                    .btn-remove-group:hover { background: #fecaca; }

                    /* Parent tag section */
                    .parent-section {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        margin-bottom: 15px;
                        padding-bottom: 12px;
                        border-bottom: 1px dashed #e2e8f0;
                    }
                    .parent-input {
                        flex-grow: 1;
                        font-weight: 700;
                        font-size: 15px;
                        border: 2px solid #edf2f7;
                        padding: 8px 12px;
                        border-radius: 8px;
                        outline: none;
                        transition: border-color 0.2s;
                    }
                    .parent-input:focus { border-color: #6366f1; }
                    .parent-label { font-size: 11px; color: #718096; text-transform: uppercase; letter-spacing: 0.5px; }

                    /* Children tags section */
                    .children-container {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 6px;
                        padding: 8px;
                        background: #f8fafc;
                        border-radius: 8px;
                        min-height: 40px;
                        align-items: center;
                    }
                    .child-tag {
                        background: #6366f1;
                        color: white;
                        padding: 3px 10px;
                        border-radius: 20px;
                        font-size: 13px;
                        display: flex;
                        align-items: center;
                    }
                    .child-tag button {
                        background: none;
                        border: none;
                        color: rgba(255,255,255,0.7);
                        margin-left: 6px;
                        cursor: pointer;
                        font-size: 16px;
                        padding: 0;
                    }
                    .child-tag button:hover { color: white; }
                    
                    .child-input {
                        border: none;
                        background: transparent;
                        outline: none;
                        font-size: 13px;
                        flex-grow: 1;
                        min-width: 150px;
                    }

                    .btn-add-main {
                        background: #1a202c;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: 600;
                        width: 100%;
                        transition: background 0.2s;
                    }
                    .btn-add-main:hover { background: #2d3748; }

                    @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
                </style>

                <div class="children-outer-wrapper">
                    <div class="children-tags-wrapper">
                        <div id="children-groups-list"></div>
                        <button class="btn-add-main" onclick="addChildGroup()">+ Create new tag structure</button>
                    </div>
                </div>

                <script>
                    (function() {
                        let childGroups = JSON.parse(localStorage.getItem('childrenTags')) || [];

                        function save() {
                            localStorage.setItem('childrenTags', JSON.stringify(childGroups));
                        }

                        window.renderChildrenGroups = () => {
                            const list = document.getElementById('children-groups-list');
                            list.innerHTML = '';

                            childGroups.forEach((group, gIndex) => {
                                const card = document.createElement('div');
                                card.className = 'parent-group';
                                card.innerHTML = \`
                                    <div class="group-header">
                                        <span>Parent tags (comma separated)</span>
                                        <button class="btn-remove-group" onclick="removeChildGroup(\${gIndex})">Delete group</button>
                                    </div>
                                    <div class="parent-section">
                                        <input type="text" class="parent-input" 
                                            placeholder="e.g. lion, dog, tiger" 
                                            value="\${group.parent}" 
                                            oninput="updateParent(\${gIndex}, this.value)">
                                    </div>
                                    <span class="parent-label">Children tags (comma separated)</span>
                                    <div class="children-container">
                                        <div id="child-list-\${gIndex}" style="display: contents;"></div>
                                        <input type="text" class="child-input" 
                                            placeholder="animals, four-legged..." 
                                            onkeydown="handleChildKey(event, \${gIndex})">
                                    </div>
                                \`;
                                list.appendChild(card);

                                const childList = card.querySelector(\`#child-list-\${gIndex}\`);
                                group.children.forEach((cTag, cIndex) => {
                                    const tagEl = document.createElement('div');
                                    tagEl.className = 'child-tag';
                                    tagEl.innerHTML = \`\${cTag}<button onclick="removeChildTag(\${gIndex}, \${cIndex})">&times;</button>\`;
                                    childList.appendChild(tagEl);
                                });
                            });
                        };

                        window.addChildGroup = () => {
                            childGroups.push({ parent: '', children: [] });
                            renderChildrenGroups();
                            save();
                        };

                        window.removeChildGroup = (index) => {
                            childGroups.splice(index, 1);
                            renderChildrenGroups();
                            save();
                        };

                        window.updateParent = (index, value) => {
                            childGroups[index].parent = value;
                            save();
                        };

                        window.handleChildKey = (e, gIndex) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                const val = e.target.value.trim();
                                if (val) {
                                    const newChildren = val.split(',')
                                        .map(t => t.trim())
                                        .filter(t => t !== '' && !childGroups[gIndex].children.includes(t));
                                    
                                    childGroups[gIndex].children.push(...newChildren);
                                    e.target.value = '';
                                    renderChildrenGroups();
                                    save();
                                }
                            }
                        };

                        window.removeChildTag = (gIndex, cIndex) => {
                            childGroups[gIndex].children.splice(cIndex, 1);
                            renderChildrenGroups();
                            save();
                        };

                        renderChildrenGroups();
                    })();
                <\/script>
            `;
        }

        function getContentActionBlockCreateNote() {
            return `
                <script>
                yesSir.actionBlockController.showSettingsToCreateActionBlock('showInfo');
                yesSir.hashHandlers.setHashCreateNote();

                // const dropdown_select_action = $('#settings_actionBlock_container').find('.dropdown_select_action');
                // dropdown_select_action.val('showInfo');
                // $('#title_action_descritption').text(yesSir.actionBlockController.model.getContentTypeDescriptionByActionEnum()[dropdown_select_action.val()]);
                
                voiceRecognitionForContent();
                
                function voiceRecognitionForContent() {
                    $('.input_field_content').focus();
                    yesSir.speakerManager.speak('Please, tell the text of the note', onEndSpeak);
                
                    function onEndSpeak() {
                        if (yesSir.hashObserver.getCurrentPageName() != yesSir.getPageNameEnum().createNote) return;

                        // Начинаем слушать микрофон и распознавать голос
                        yesSir.voiceRecognitionService.startRecognizing({
                            callbackInterimTranscript: onInterimTranscript, 
                            callbackFinalTranscript: onFinalTranscript, 
                            callbackEnd: onEndVoiceRecognition
                        });

                        function onInterimTranscript(result_text) {
                            // console.log('InterimTranscript', result_text);
                            $('.input_field_content').val(result_text);
                        }

                        function onFinalTranscript(result_text) {
                            $('.input_field_content').val(result_text);
                            yesSir.speakerManager.speak('Thank you!');
                            voiceRecognitionForCommand();
                        }

                        function onEndVoiceRecognition() {
                            // console.log('end');
                        }
                    }
                }
                
                function voiceRecognitionForCommand() {
                    $('.input_field_title').focus();
                    yesSir.speakerManager.speak('Please, tell the command that opens this note', onEndSpeak);
                
                    function onEndSpeak() {
                        if (yesSir.hashObserver.getCurrentPageName() != yesSir.getPageNameEnum().createNote) return;

                        yesSir.voiceRecognitionService.startRecognizing({
                            callbackInterimTranscript: onInterimTranscript, 
                            callbackFinalTranscript: onFinalTranscript, 
                            callbackEnd: onEndVoiceRecognition
                        });

                        function onInterimTranscript(result_text) {
                            $('.input_field_title').val(result_text);
                        }

                        function onFinalTranscript(result_text) {
                            $('.input_field_title').val(result_text);
                            yesSir.speakerManager.speak('Thank you!');
                            voiceRecognitionSaveResult();
                        }

                        function onEndVoiceRecognition() {
                            // console.log('end');
                        }
                    }
                }
                
                function voiceRecognitionSaveResult() {
                    yesSir.speakerManager.speak('Do you want to save this note?', onEndSpeak);
                
                    function onEndSpeak() {
                        if (yesSir.hashObserver.getCurrentPageName() != yesSir.getPageNameEnum().createNote) return;
                        
                        yesSir.voiceRecognitionService.startRecognizing({
                            callbackInterimTranscript: onInterimTranscript, 
                            callbackFinalTranscript: onFinalTranscript, 
                            callbackEnd: onEndVoiceRecognition
                        });

                        function onInterimTranscript(result_text) {
                            // console.log('interim result', result_text);
                        }

                        function onFinalTranscript(result_text) {
                            // console.log('final result', result_text);

                            if (result_text.includes('no') || result_text.includes('nope') || result_text.includes("don't")) {
                                isFinalResult = true;
                                yesSir.speakerManager.speak("Ok. I didn't save the note. You can customize the note manually. I'm switching off");
                            
                                return;
                            }
                            else if (
                                result_text.includes('save') || result_text.includes('yes') || 
                                result_text.includes('yeah') || result_text.includes('want')
                            ) {
                                isFinalResult = true;
                                yesSir.speakerManager.speak('Ok. Note has been saved!', onEndSpeak);
                                
                                function onEndSpeak() {
                                    $('#btn_create_actionBlock').click();
                                }

                                return;
                            }
                        }

                        function onEndVoiceRecognition() {
                            // console.log('end');
                        }
                    }
                }
                </script>
            `;
        }

        function getContentActionBlockDeleteAllActionBlocks() {
            return `<script>
            yesSir.actionBlockWrapper.deleteAllActionBlocks();
            </script>`;
        }

        function getContentActionBlockSpeechAssistant() {
            return `<script>
                
            </script>`;
        }

        function getContentActionBlockLogin() {
            return `<script>
                yesSir.hashHandlers.setHashLogin();
            </script>`;
        }

        function getContentActionBlockGetFromDatabase() {
            return `<script>
                yesSir.hashHandlers.setHashGetFromDatabase();
            </script>`;
        }
        
        function getContentActionBlockSaveToDatabase() {
            return `<script>
                yesSir.hashHandlers.setHashSaveToDatabase();
            </script>`;
        }
        
        return default_actionBlocks;
    }
}