module.exports = function listen(element, keymap) {
  var keys = {}
  var updating = false

  element.addEventListener("keydown", input)
  element.addEventListener("keyup", input)

  function input(event) {
    var name = null
    if (keymap) {
      for (var name in keymap) {
        for (var i = 0; i < keymap[name].length; i++) {
          if (keymap[name][i] === event.code) {
            break
          }
        }
        if (i < keymap[name].length) {
          break
        } else {
          name = null
        }
      }
    }
    if (!name) name = event.code
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

  return keys
}
