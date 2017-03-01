# keys
> Small boilerplate for key input in the browser

## Installation
```sh
npm install semibran/keys
```

## Usage
```javascript
var keys = Keys(element) // -> Keys instance
```
Use the factory exported by this module to create a new `Keys` instance. Once it is called, it will immediately begin listening for key events. All of these events are scoped down to `element`, meaning that they will only be triggered when the element is in focus.

A `Keys` instance is an object that maps browser-defined key codes (e.g. `Space`, `ArrowUp`, `KeyP`) to the amount of frames the key in question has been pressed. In case the requested key is not pressed, it will either be `undefined` if it has not been pressed before or `0` otherwise.

Therefore, you can check if a key is pressed with a simple if-statement detecting if the desired key's value is truthy.
```javascript
if (keys.ArrowLeft)
	hero.move(...LEFT)
```

To detect if a key has been "tapped", check if the value is equal to `1`:
```javascript
if (keys.KeyP === 1)
	game.pause()
```

In order to detect a key release, you may want to store the previous key state in a variable. Bare-bones (incomplete) example:
```javascript
// Previous key state goes in here
var keysLast = {}

function update() {
	// Call this function again after one frame
	requestAnimationFrame(update)

	// If the spacebar was held for two seconds:
	if (!keys.Space && keysLast.Space > 120)
		hero.shootGiantWaveOfDestruction()

	// Save the current key state
	Object.assign(keysLast, keys)

}
```

## License
MIT
