module.exports = function Keys(element) {

	var keys = {}

	element.addEventListener('keydown', onKeyDown)
	element.addEventListener('keyup', onKeyUp)
	update()

	return keys

	function update() {
		requestAnimationFrame(update)
		for (var name in keys)
			if (keys[name])
				keys[name]++
	}

	function onKeyDown(event) {
		if (!keys[event.code])
			keys[event.code] = 1
	}

	function onKeyUp(event) {
		keys[event.code] = 0
	}
}
