# key-state
> simple DOM keyboard state tracker

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

This package is a thin wrapper over `KeyboardEvent` which provides a flexible and intuitive interface for tracking DOM keyboard state.

## usage
[![npm badge]][npm package]

### `listen(element, keymap?)`
To begin listening for key events, call the function exported by this module (`listen`) while passing in the `element` that you'd like to scope down key events to (usually `window`), like so:

```js
const listen = require("key-state")
var keys = listen(window)
```

`listen` returns the keyboard state (`keys`, for **key**board **s**tate) in the form of an object which maps browser-defined key names as provided by `event.code` to the amount of frames the key in question has been held down. For example, after holding down the spacebar for half a second, `keys.Space` would yield `30` at 60 frames per second.

The `keys` map is populated and updated automatically as key events are received. If a key hasn't been pressed since the map was created, it will evaluate to `undefined`. This feature implies that any key that isn't being pressed will be mapped to either `0` or `undefined`, meaning you can check if a key _is_ being pressed by determining if its value is truthy.

```js
if (keys.Enter) {
  // The enter key is being pressed. Wow
}
```

If you'd prefer to use your own custom key names for flexibility, pass a `keymap` into `listen` with the following `name -> [ keys ]` structure:

```js
const keys = require("key-state")(window, {
  left: [ "ArrowLeft", "KeyA" ],
  right: [ "ArrowRight", "KeyD" ]
})
```

Then, just access the key times using the names you specified. Feeding multiple keys into the keymap's corresponding key list will prompt the listener to lump all of those keys under a single name.

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
MIT © [Brandon Semilla][github profile]

[npm badge]: https://nodei.co/npm/key-state.png?mini
[npm package]: https://www.npmjs.com/package/key-state
[github profile]: https://github.com/semibran
[browser-defined key names]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
