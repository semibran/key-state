# key-state
> Simple keyboard state tracker

```js
function loop() {
  if (keys.ArrowLeft) {
    move(hero, "left")
  }
  if (keys.ArrowRight) {
    move(hero, "right")
  }
  requestAnimationFrame(loop)
}
```

This package is a small wrapper over `KeyboardEvent` which provides a flexible and intuitive interface for tracking DOM keyboard state.

## usage
[![NPM](https://nodei.co/npm/key-state.png?mini)](https://www.npmjs.com/package/key-state)

### `listen(element, keymap?)`
To begin listening for key events, call the function exported by this module (`listen`) with the `element` that you'd like to scope down key events to (usually `window`), like so:

```js
const listen = require("key-state")
var keys = listen(window)
```

`listen` returns the keyboard state (`keys`) in the form of an object which maps [browser-defined key names](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) as provided by `event.key` to the amount of frames the key in question has been held down.

The `keys` map is populated and updated automatically as key events are received. If a key hasn't been pressed since the map was created, it will evaluate to `undefined`.

Since a key that isn't being pressed gets mapped to either `0` or `undefined`, you can check if a key _is_ being pressed by determining if its value is truthy.

```js
if (keys.Enter) {
  // The enter key is being pressed. Wow
}
```

If you'd prefer to use your own custom key names, pass a `keymap` into `listen`:

```js
const keys = require("key-state")(window, {
  ArrowLeft: "left",
  ArrowRight: "right"
})
```

Then, access the key times using the names you specified.

```js
function loop() {
  if (keys.left) {
    move(hero, "left")
  }
  if (keys.right) {
    move(hero, "right")
  }
  requestAnimationFrame(loop)
}
```

## license
[MIT](https://opensource.org/licenses/MIT) © [Brandon Semilla](https://git.io/semibran)
