# keys
> Flexible event system for key response

## Usage

### Factory
```javascript
Keys(element) // -> Keys instance
```

Use the factory exported by this module to create a new `Keys` instance.

All events are scoped down to `element`, meaning that they will only be called when the element is in focus. If no element is provided, `element` will default to the main `window` instance.

### Methods
`keys` has a grand total of 2 (!!) methods. `on` is used to listen for key events and `emit` is used to "simulate" a key event.

Just in case repeating `keys.on` and `keys.emit` fifty times isn't your jam, both methods return themselves, allowing for an odd kind of chaining:

```javascript
keys.on
  ('hold')('ArrowLeft', 'KeyA')(moveLeft)
  ('hold')('ArrowRight', 'KeyD')(moveRight)
  // ...
```

You may consider it more practical to reroute each event/key to a single dispatcher function if this looks a little clumsy to you.

```javascript
keys.on('hold')(...ARROW_KEYS, ...WASD)(respondToMovementKeys)
```

**Note:** Valid parameters for [event types](#event-types) and [key identifiers](#key-identifiers) can be found further below.

#### `on`
```javascript
keys.on(...types)(...keys)(callback) // -> `keys.on`
```

Calls `callback` once an event of the types indicated by `events` is triggered with one of the specified `keys`.

```javascript
keys.on('tap', 'release')('Space')(event => {
  // ...
})
```

**Note:** The `Keys` instance will begin adding event listeners following the first valid `on` call, instead of adding them presumptuously upon creation.

#### `emit`
```javascript
keys.emit(type, key)
```

Calls all of the previously defined callbacks of the event type indicated by `event` with the provided `key`.

This method may be used to "simulate" key events when input is received in a non-conventional way, e.g. with game controllers or across a network. It is also used internally by the library to respond to key events.

### Properties

#### `data`
An object detailing the current state of all relevant keys on the keyboard, structured as follows:

```javascript
data:
  <Key identifier>:
    name: <Key identifier>
    char: <Character representation of this key>
    code: <ASCII key code for this key>
    down: <Is this key pressed?>
    time: <Frames this key has been pressed>
    listeners:
      press:   <Callbacks assigned to `press` event>
      tap:     <Callbacks assigned to `tap` event>
      hold:    <Callbacks assigned to `hold` event>
      release: <Callbacks assigned to `release` event>
  // More keys...
```

### Event types
- `press`: The default keypress behavior as defined by the operating system. Generally, one keypress is fired after a key is pressed, followed by a brief half-second pause (i.e. 30 frames) then fires every 30th of a second (every other frame).
- `tap`: Only fires the first frame a key is pressed.
- `hold`: Fires every frame after a key is first pressed.
- `release`: Fires once a key is released.

### Key identifiers
`keys` uses the browser's predefined [identifier codes](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code) to identify each key.

### Callback data
By default, a callback is fed two separate arguments. `key` is usually used more often than `event`, so the latter is provided as a second argument mainly so it can be omitted if desired.

Each of these items passed to the callback pertains to a predictably rigid structure.

#### `key`
> Specific data regarding the key in question

This is identical to the object represented by `<Key identifier>` in [`keys.data`](#data).

#### `event`
> Metadata regarding the current key event

```javascript
{
  type: String // The event type; see above for valid types
  target: HTMLElement // The HTML element initially provided to the factory `Keys` on instantiation
  timestamp: Number // The time this event was sent; equivalent to `Date.now()` at the time of sending
}
```

## License
MIT
