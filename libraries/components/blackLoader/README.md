Add the link to the index.js file of this component in ```<script>``` tag of your html file.
Create object of BlackLoaderManager passing next parameters: projectAssetLoader, targetId.

Example object creation:

```
const blackLoaderManager = await BlackLoaderManager.create({ projectAssetLoader , targetId: 'blackLoader' });
```

Display loading:

```
blackLoaderManager.startLoading();
```

Hide loading:

```
blackLoaderManager.stopLoading();
```

You can also open ```./test/test.html``` in browser to test functionallity