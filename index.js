module.exports = function listen(element, keymap) {
  var keys = {}
  var updating = false

  element.addEventListener("keydown", input)
  element.addEventListener("keyup", input)

  return keys

  function input(event) {
    var key = event.key
    var name = keymap && keymap[key] || key
    if (event.type === "keydown") {
      if (!keys[name]) {
        keys[name] = 1
      }
    } else if (event.type === "keyup") {
      keys[name] = 0
    }
    if (!updating) {
      updating = true
      requestAnimationFrame(update)
    }
  }

  function update() {
    for (var name in keys) {
      if (keys[name]) {
        keys[name]++
      }
    }
    requestAnimationFrame(update)
  }
}
