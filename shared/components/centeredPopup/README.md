<h2>Usage<h2>
1. Add path to this folder /index.js.
   For example:

```
"./shared/components/centeredPopup/index.js",
```

2. Create the class CenteredPopupManager and indicate where to display it in your html.
   
```js
const centeredPopup = await CenteredPopupManager.create({ projectAssetLoader: projectAssetLoader, targetId: 'yourId' });
```

In this example id is yourId so element in html is <div id="yourId"></div>

1. Use methods.

Example:

```js
centeredPopup.show({ title: 'title', content: 'content' });
```