const keys = require('./')(window)

loop()

function loop() {
	requestAnimationFrame(loop)
	document.body.innerHTML = JSON.stringify(keys, null, 2)
}
