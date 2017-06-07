# keyboard-state
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

## install
```sh
npm install keyboard-state
```

## usage
To begin listening for events, call the function exported by this module (`listen`) with the `element` that you'd like to scope down key events to (usually `window`).

```javascript
const listen = require('keyboard-state')

var keys = listen(window)
```

`listen` returns the keyboard state (`keys`) in the form of an object which maps browser-defined key names as defined by `event.key` (`Enter`, `ArrowUp`, `p`...) to the amount of frames the key in question has been held down.

The `keys` map is populated and updated automatically as key events are received. If a key hasn't been pressed since the map was created, it will evaluate to `undefined`.

Since a key that isn't being pressed gets mapped to either `0` or `undefined`, you can check if a key _is_ being pressed by determining if its value is truthy.

```js
if (keys.Enter) {
  // The enter key is being pressed. Wow
}
```

If you'd prefer to use names other than the browser-defined key names, consider using [`object-rename`](https://github.com/semibran/object-rename) to switch them out for something else.

## license
[MIT](https://opensource.org/licenses/MIT) © [Brandon Semilla](https://git.io/semibran)
