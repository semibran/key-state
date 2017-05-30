# keys
> Simple keyboard state tracker

```js
function loop() {
  if (keys.ArrowLeft) {
    move(hero, 'left')
  }
  if (keys.ArrowRight) {
    move(hero, 'right')
  }
	requestAnimationFrame(loop)
}
```

## usage
To begin listening for events, call the function exported by this module (`listen`) with the element that you'd like to scope down key events to.

```javascript
var keys = require('keys')(window)
```

`listen` returns the keyboard state (`keys`) in the form of an object which maps browser-defined key names as defined by `event.code` (`Enter`, `ArrowUp`, `KeyP`...) to the amount of frames the key in question has been held down.

The `keys` map is populated and updated automatically as key events are received. Therefore, if a key hasn't been pressed since the map was created, it will evaluate to `undefined`.

Since a key that isn't being pressed gets mapped to either `0` or `undefined`, you can check if a key _is_ being pressed by determining if its value is truthy.

```js
if (keys.Space) {
	// The spacebar is being pressed. Wow
}
```

If you'd prefer to use names other than the browser-defined key names, consider using [`object-rename`](https://github.com/semibran/object-rename).

## install
```sh
npm install semibran/keys
```

## license
MIT
