index.js is the principal file.

<h2>Connect</h2>
Load script index.js to the main html.
And load script projectAssetLoader.js
</br>Example:

```html
<script src="./features/multiColorCircleLoader/index.js"></script>
<script src="./shared/projectAssetLoader.js"></script>
```

Then create an object in async.
</br>Example:

```js
(async () => {
    this.loaderController = await new LoaderInitializer(
        {
            projectAssetLoaderClass: ProjectAssetLoader,
            targetId: 'multiColorCircleLoaderContainer', 
            data: {}
        }
    );
})();
```

<h2>Usage</h2>
Display loading: 

```js
this.loaderController.startLoading();
```

Hide loading:
```js
this.loaderController.stopLoading();
```
