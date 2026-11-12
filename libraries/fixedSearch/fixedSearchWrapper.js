class FixedSearchWrapper {
  async init({ projectAssetLoader, textManager, targetId, data }) {
    this.coreController = await new FixedSearchBootstrapper({ projectAssetLoader, textManager, targetId, data });

    // Bringing back Proxy for automatic method delegation
    return new Proxy(this, {
      get(target, prop, receiver) {
        // If the method exists in the decorator, call it
        if (prop in target) {
          const value = Reflect.get(target, prop, receiver);
          return typeof value === 'function' ? value.bind(target) : value;
        }

        // Otherwise, automatically proxy the call to the original core controller
        const coreValue = Reflect.get(target.coreController, prop, receiver);
        return typeof coreValue === 'function' ? coreValue.bind(target.coreController) : coreValue;
      }
    });
  }

  //  // Декорируем ТОЛЬКО то поведение, которое нужно расширить 
  //  addNote(noteText) {
  //   this.logger?.log('[NoteWrapper]: Лог: попытка создания заметки...');

  //   // Вызываем оригинальный метод ядра
  //   const result = this.coreController.addNote(noteText);

  //   this.logger?.log('[NoteWrapper]: Лог: заметка успешно создана.');
  //   return result;
  //  }
}