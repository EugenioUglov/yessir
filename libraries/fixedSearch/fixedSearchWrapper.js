class FixedSearchWrapper {
	constructor({ projectAssetLoader, targetId }) {
		// Return promise.
		return this.init({ projectAssetLoader, targetId });
	}

	async init({ projectAssetLoader, targetId }) {
		this.coreController = await new FixedSearchBootstrapper({ projectAssetLoader, targetId });

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

	// Decorate the setText method to add logging functionality
	setText(text) {
		console.log(`[FixedSearchWrapper]: Setting text to: ${text}`);
		// Call the original method on the core controller
		this.coreController.setText(text);
	}
}