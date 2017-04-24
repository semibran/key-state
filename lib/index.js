module.exports = function Keys (element) {
	var keys = {}
	var updating = false

	element.addEventListener('keydown', input)
	element.addEventListener('keyup', input)

	return keys

	function update() {
		requestAnimationFrame(update)
		for (var name in keys) {
			if (keys[name]) {
				keys[name]++
			}
		}
	}

	function input (event) {
		var name = event.code
		if (event.type === 'keydown') {
			if (!keys[name]) {
				keys[name] = 1
			}
		} else {
			keys[name] = 0
		}
		if (!updating) {
			updating = true
			update()
		}
	}
}