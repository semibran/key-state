module.exports = function Keys(element) {
  // If no element is provided, default to `window`
  if (!element)
    element = window

  // Initialize listeners
  var listeners = {}
  listener('any')

  // Key state
  var pressed = {}
  var held = {}
  var released = {}

  // Listen on `element` for events
  element.addEventListener('keydown', down)
  element.addEventListener('keyup',   up)
  update()

  return Object.assign(keys, { listeners, pressed, held, released, press, hold, release })

  function keys(callback) {
    listeners.any.any.push(callback)
  }

  function update() {
    for (let key in pressed)
      pressed[key] = false
    for (let key in released)
      released[key] = false
    for (let key in held) {
      if (held[key]) {
        var data = event(key)
        var type = data.type = 'hold'
        held[key]++
        data.time++
        emit(name, type, data)
        emit('any', type, data)
        emit('any', 'any', data)
      }
    }
    window.requestAnimationFrame(update)
  }

  function down(e) {
    var name = e.code
    if (held[name])
      return
    var data = event(e)
    var type = data.type = 'press'
    held[name] = data.time = 1
    pressed[name] = true
    emit(name, type, data)
    emit('any', type, data)
    emit('any', 'any', data)
  }

  function up(e) {
    var name = e.code
    if (!held[name])
      return
    var data = event(e)
    var type = data.type = 'release'
    released[name] = true
    emit(name, type, data)
    emit('any', type, data)
    emit('any', 'any', data)
    held[name] = data.time = 0
  }

  function press(...keys) {
    var callback = keys[0]
    if (typeof callback === 'function') {
      listeners.any.press.push(callback)
      return press
    }
    return function call(callback) {
      for (var key of keys)
        listener(key).press.push(callback)
      return call
    }
  }

  function hold(...keys) {
    var [callback] = keys
    if (typeof callback === 'function') {
      listeners.any.hold.push(callback)
      return hold
    }
    return function call(callback) {
      for (var key of keys)
        listener(key).hold.push(callback)
      return call
    }
  }

  function release(...keys) {
    var [callback] = keys
    if (typeof callback === 'function') {
      listeners.any.release.push(callback)
      return release
    }
    return function call(callback) {
      for (var key of keys)
        listener(key).release.push(callback)
      return call
    }
  }

  function emit(key, type, data) {
    for (var callback of listener(key)[type])
      callback(data)
  }

  function event(e) {
    var code
    if (typeof e === 'string')
      code = e
    else
      var { type, code, key, keyCode } = e
    var event = listener(code).event
    if (event)
      return event
    event = listener(code).event = { type: null, name: code, char: key, code: keyCode, time: 0, target: element }
    if (type === 'keydown')
      event.type = 'press'
    else if (type === 'keyup')
      event.type = 'release'
    return event
  }

  function listener(key) {
    var listener = listeners[key]
    if (!listener) {
      listener = listeners[key] = { press: [], hold: [], release: [], event: null }
      if (key === 'any')
        listener.any = []
    }
    return listener
  }
}
