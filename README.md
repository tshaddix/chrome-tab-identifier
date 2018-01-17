# chrome-tab-identifier

Simple utility to fetch the current tab id inside a content-script.

## Install

```
npm install --save chrome-tab-identifier
```

## Usage

On your event page:

```js
import { TabIdentifier } from "chrome-tab-identifier";

const tabIdentifier = new TabIdentifier();
```

Then, on your content script:

```js
import { TabIdentifierClient } from "chrome-tab-identifier";

const tabIdClient = new TabIdentifierClient();

tabIdClient.getTabId().then(tabId => {});
```

### Advanced Usage

By default, this package will use a message with the `type` property set to `"__TAB_ID__"`. If you need to use your own type for whatever reason, you can just pass it as the first argument to both the identifier and the client:

```js
new TabIdentifier("custom-type");
// ...
new TabIdentifierClient("custom-type");
```

Please note: If you do this and don't use the same string in both the identifier and client, then this won't work.
