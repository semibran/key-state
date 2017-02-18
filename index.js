module.exports = function Keys(element, dispatch) {

	var keys = {}
	var updating = false

	element.addEventListener('keydown', function (evt) {
		var key = getKey(evt)
		var evt = getEvent('press')
		if (!key.pressed) {
			key.pressed = true
			key.time = 1
		}
		if (dispatch)
			dispatch(key, evt)
		if (!updating) {
			updating = true
			requestAnimationFrame(update)
		}
	})


	element.addEventListener('keyup', function (evt) {
		var key = getKey(evt)
		var evt = getEvent('release')
		if (key.pressed) {
			key.pressed = false
			key.released = true
		}
		if (dispatch)
			dispatch(key, evt)
		key.time = 0
		if (!updating) {
			updating = true
			requestAnimationFrame(update)
		}
	})

	return keys

	function update() {
		for (var name in keys) {
			var key = keys[name]
			if (key.pressed)
				key.time++
			key.released = false
		}
		requestAnimationFrame(update)
	}

	function getKey(evt) {
		var name = evt.code
		var key = keys[name]
		if (!key)
			key = keys[name] = { name, char: evt.key, code: evt.keyCode, time: 0 }
		return key
	}

	function getEvent(type) {
		return { type, target: element, timestamp: Date.now() }
	}
}
