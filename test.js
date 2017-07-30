const keys = require('./')(window, {
  ArrowLeft: "left",
  ArrowUp: "up",
  ArrowRight: "right",
  ArrowDown: "down"
})

loop()

function loop() {
	document.body.innerHTML = JSON.stringify(keys, null, 2)
  requestAnimationFrame(loop)
}
