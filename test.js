const keys = require("./lib/key-state")(window, {
  left:  [ "ArrowLeft",  "KeyA" ],
  right: [ "ArrowRight", "KeyD" ],
  up:    [ "ArrowUp",    "KeyW" ],
  down:  [ "ArrowDown",  "KeyS" ],
})

loop()

function loop() {
  document.body.innerHTML = JSON.stringify(keys, null, 2)
  requestAnimationFrame(loop)
}
