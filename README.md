# keys
> Flexible dispatcher system for key response

## Installation
```sh
npm install --save semibran/keys
```

## Usage
```javascript
var keys = Keys(element[, dispatch]) // -> Keys instance
```

Use the factory exported by this module to create a new `Keys` instance. Once it is called, `Keys` will immediately begin listening for key events.

All events are scoped down to `element`, meaning that they will only be called when the element is in focus.

Every time a key is pressed or released, `dispatch` will be called with the arguments `key` and `evt` (if it exists).

### `key`
> Persistent data specific to each key

- `name`: The browser-defined name for this key (i.e. `event.code`)
- `char`: The char glyph for this key, if available (i.e. `event.key`)
- `code`: An ASCII key code (i.e. `event.keyCode`)
- `time`: Frames this key has been pressed
- `pressed`: Sugar for `time > 0` (or just `time`)
- `released`: `true` if this key was just released

### `evt`
> Unique data for each key event

- `type`: The type of key event in question - can be either `'press'` or `'release'`
- `target`: The element initially passed into `Keys`
- `timestamp`: Equivalent to `Date.now()` at the time of event dispatch

The aforementioned factory returns the state of all keys (usually known as `keys`) that have been pressed on the keyboard. All keys which are passed to the `dispatch` function are stored in this state object.

```javascript
function dispatch(key) {
	key === keys[key.name] // -> true
}
```

## License
MIT
