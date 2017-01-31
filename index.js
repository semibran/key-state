module.exports = function Keys(element) {

  if (!element)
    element = window

  const events = ['press', 'tap', 'hold', 'release']

  var data = {}
  var listening = false

  return { data, on, emit }

  function on(...types) {
    return (...keys) => (callback) => {
      if (!listening)
        listen()
      for (var name of keys) {
        var key = data[name]
        if (!key)
          key = data[name] = createKey(name)
        for (var type of types) {
          var callbacks = key.listeners[type]
          if (!callbacks.includes(callback))
            callbacks.push(callback)
        }
      }
      return on
    }
  }

  function emit(type, key) {
    if (key in data)
      key = data[key]
    var callbacks = key.listeners[type]
    if (callbacks.length) {
      var event = { type, target: element, timestamp: Date.now() }
      for (var callback of callbacks)
        callback(key, event)
    }
    return emit
  }

  function listen() {
    listening = true
    element.addEventListener('keydown', onKey)
    element.addEventListener('keyup',   onKey)
    update()
  }

  function update() {
    for (var name in data) {
      var key = data[name]
      if (key.time) {
        emit('hold', key)
        key.time++
      }
    }
    window.requestAnimationFrame(update)
  }

  function onKey(event) {
    var name = event.code
    var key = data[name]
    if (!key)
      return
    if (!key.char)
      key.char = event.key
    if (!key.code)
      key.code = event.keyCode
    switch (event.type) {
      case 'keydown':
        return onKeyDown(key)
      case 'keyup':
        return onKeyUp(key)
    }
  }

  function onKeyDown(key) {
    if (!key.down) {
      key.down = true
      key.time++
      emit('tap', key)
    }
    emit('press', key)
  }

  function onKeyUp(key) {
    if (!key.down)
      return
    key.down = false
    emit('release', key)
    key.time = 0
  }

  function createKey(name) {
    var listeners = {}
    for (var event of events)
      listeners[event] = []
    return { listeners, down: false, time: 0, name }
  }
}
