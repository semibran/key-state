# keys
> Key input in the browser made simple

## usage
```javascript
var keys = require('keys')(window)

function input (keys) {
  if (keys.ArrowLeft) {
    move(hero, 'left')
  }
  if (keys.ArrowRight) {
    move(hero, 'right')
  }
}
```

### installing `keys`
```sh
npm install semibran/keys#v1.0.0
```
Use of release tags is recommended for stability purposes.

### listening for events
```javascript
var keys = Keys(element)
```
Once `Keys` is called, it will begin listening on the provided `element` for key events. Usually, the desired element will be the global `window` in order to catch all key events regardless of element focus.

`keys` is an object which maps browser-defined key codes (e.g. `Space`, `ArrowUp`, `KeyP`) to the amount of frames the key in question has been held down. If the key hasn't been pressed since `Keys` was called, it will show up as `undefined`.

The `keys` object will be populated as key events are received.

### using the `keys` object

You can check if a key is currently being pressed by determining if the desired key's value is truthy, i.e. greater than `0`.
```javascript
if (keys.ArrowLeft) {
  move(hero, 'left')
}
```

For simplicity, detecting a key release is slightly more complicated - you could listen for `keyup` events independently, or you could store the previous key state in a variable.
```javascript
var keysPrev = {}
function loop () {
  // If the spacebar is not pressed but it was pressed during the previous frame:
  if (!keys.Space && keysPrev.Space) {
    // The spacebar has just been released, do stuff
  }
  // Store the current key state
  Object.assign(keysPrev, keys)
  // Call this function again after one frame
  requestAnimationFrame(loop)
}
```

## license
MIT
