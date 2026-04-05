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
            content: '<script>yesSir.actionBlockService.showSettingsToCreateActionBlock()</script>',
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
            content: '<script>yesSir.actionBlockService.downloadFileWithActionBlocks();</script>',
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
    
        const actionBlock_facebook_of_developer = {
            title: 'Open Facebook page of developer',
            tags: 'Open Facebook page of developer, account, contact, message, default',
            action: 'openURL',
            content: 'https://www.facebook.com/eugeniouglov',
            imageURL: 'https://i.ibb.co/QJ4y5v3/DEVELOPER-facebook.png'
        };
    
        const actionBlock_email_of_developer = {
          title: "Write email to developer - eugeniouglov@gmail.com",
          tags: "Write email to developer, contact, message, gmail, mail, default",
          action: "openURL",
          content: "mailto:eugeniouglov@gmail.com",
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
            title: 'GetFrom database in Live',
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
            actionBlock_facebook_of_developer, 
            actionBlock_email_of_developer,
            actionBlock_open_file_manager,
            actionBlock_save_to_file,
            actionBlock_delete_all_actionBlocks,
            actionBlock_open_speeh_assistant,
            // actionBlock_login,
            actionBlock_get_from_database,
            actionBlock_save_to_database,
            // actionBlock_open_data_storage_manager,
            // actionBlock_logs,
            // actionBlock_voiceRecognitionSettings
        ];



        function getContentActionBlockOpenFileManager() {
            return `
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
                
                <script>
                $('.btn_upload_actionBlocks').on('change', (event) => {
                    yesSir.fileManager.uploadFile(onFileLoaded);
            
                    function onFileLoaded(content_of_file) {
                        yesSir.actionBlockService.saveActionBlocksFromFile(content_of_file);
            
                        // Give possibility to load the same file again.
                        $('.btn_upload_actionBlocks').value = '';
            
                        window.location.hash = "main";
                    }
                });
            
                $('.btn_download_actionBlocks')[0].addEventListener('click', () => {
                    yesSir.actionBlockService.downloadFileWithActionBlocks();
                });
                </script>
            `;
        }

        function getContentActionBlockSetSynonymTags() {
            return `
                <style>
                    .synonyms-wrapper {
                        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                        max-width: 500px;
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

                <div class="synonyms-wrapper">
                    <div id="groups-list"></div>
                    <button class="btn-add-group" onclick="addGroup()">+ Добавить группу синонимов</button>
                </div>

                <script>
                    (function() {
                        // Загружаем массив массивов
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
                                        <span>Группа #\${gIndex + 1}</span>
                                        <button class="btn-remove-group" onclick="removeGroup(\${gIndex})">Удалить группу</button>
                                    </div>
                                    <div class="tag-container">
                                        <div id="tags-\${gIndex}" style="display: contents;"></div>
                                        <input type="text" class="tag-input" 
                                            placeholder="Введите синонимы через запятую..." 
                                            onkeydown="handleKey(event, \${gIndex})"
                                            onblur="processInput(this.value, \${gIndex})">
                                    </div>
                                \`;
                                container.appendChild(groupDiv);

                                // Отрисовка тегов внутри группы
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
                    .children-tags-wrapper {
                        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
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
                    /* Секция главного тега */
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

                    /* Секция дочерних тегов */
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

                    .btn-delete-group {
                        color: #a0aec0;
                        background: none;
                        border: none;
                        cursor: pointer;
                        font-size: 12px;
                    }
                    .btn-delete-group:hover { color: #e53e3e; }

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

                <div class="children-tags-wrapper">
                    <div id="children-groups-list"></div>
                    <button class="btn-add-main" onclick="addChildGroup()">+ Создать новую структуру тегов</button>
                </div>

                <script>
                    (function() {
                        // Структура: [{ parent: string, children: string[] }]
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
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                                        <span class="parent-label">Родительский тег</span>
                                        <button class="btn-delete-group" onclick="removeChildGroup(\${gIndex})">Удалить группу</button>
                                    </div>
                                    <div class="parent-section">
                                        <input type="text" class="parent-input" 
                                            placeholder="Напр: Животные" 
                                            value="\${group.parent}" 
                                            oninput="updateParent(\${gIndex}, this.value)">
                                    </div>
                                    <span class="parent-label">Дочерние теги (через запятую)</span>
                                    <div class="children-container">
                                        <div id="child-list-\${gIndex}" style="display: contents;"></div>
                                        <input type="text" class="child-input" 
                                            placeholder="собака, кошка, лев..."
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
                            save(); // Сохраняем текст родителя при вводе
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
                yesSir.actionBlockService.showSettingsToCreateActionBlock('showInfo');
                yesSir.hashService.setHashCreateNote();

                // const dropdown_select_action = $('#settings_actionBlock_container').find('.dropdown_select_action');
                // dropdown_select_action.val('showInfo');
                // $('#title_action_descritption').text(yesSir.actionBlockService.model.getContentTypeDescriptionByActionEnum()[dropdown_select_action.val()]);
                
                voiceRecognitionForContent();
                
                function voiceRecognitionForContent() {
                    $('.input_field_content').focus();
                    yesSir.speakerManager.speak('Please, tell the text of the note', onEndSpeak);
                
                    function onEndSpeak() {
                        if (yesSir.hashService.getCurrentPageName() != yesSir.getPageNameEnum().createNote) return;

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
                        if (yesSir.hashService.getCurrentPageName() != yesSir.getPageNameEnum().createNote) return;

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
                        if (yesSir.hashService.getCurrentPageName() != yesSir.getPageNameEnum().createNote) return;
                        
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
                yesSir.actionBlockService.deleteAllActionBlocks();
            </script>`;
        }

        function getContentActionBlockSpeechAssistant() {
            return `<script>
                yesSir.hashService.setHashSpeechAssistant();
            </script>`;
        }

        function getContentActionBlockLogin() {
            return `<script>
                yesSir.hashService.setHashLogin();
            </script>`;
        }

        function getContentActionBlockGetFromDatabase() {
            return `<script>
                yesSir.hashService.setHashGetFromDatabase();
            </script>`;
        }
        
        function getContentActionBlockSaveToDatabase() {
            return `<script>
                yesSir.hashService.setHashSaveToDatabase();
            </script>`;
        }
        
        return default_actionBlocks;
    }
}