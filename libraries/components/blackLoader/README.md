Add the link to the index.js file of this component in ```<script>``` tag of your html file.
Create object of BlackLoaderBootstrapper passing next parameters: projectAssetLoader, targetId.

Example object creation:

```
const blackLoaderBootstrapper = await BlackLoaderBootstrapper.create({ projectAssetLoader , targetId: 'blackLoader' });
```

Display loading:

```
blackLoaderBootstrapper.startLoading();
```

Hide loading:

```
blackLoaderBootstrapper.stopLoading();
```

You can also open ```./test/test.html``` in browser to test functionallity