module.exports = function Keys(element) {

  if (!element)
    element = window

  var data = { pressed: {}, tapped: {}, held: {}, released: {} }
  var any = ['press', 'tap', 'hold', 'release']

  element.addEventListener('keydown', down)
  element.addEventListener('keyup',   up)
  update()

  return { on }

  function on(...keys) {
    return function (...types) {

      var [callback] = types
      if (typeof callback === 'function') {
        types = any
        return call(callback)
      }

      return call

      function call(callback) {
        for (var key of keys) {
          var listeners = getListeners(key)
          for (var type of types)
            listeners[type].push(callback)
        }
        return on
      }
    }
  }

  function emit(key, type, event) {
    event.type = type
    var listeners = getListeners(key)
    var callbacks = listeners[type]
    for (var callback of callbacks)
      callback(event)
  }

  function down(e) {
    var key = e.code
    var event = getEvent(e)
    if (!data.pressed[key]) {
      data.pressed[key] = true
      data.tapped[key] = true
      data.held[key] = event.time = 1
      emit(key, 'tap', event)
    }
    emit(key, 'press', event)
  }

  function up(e) {
    var key = e.code
    var event = getEvent(e)
    if (data.pressed[key]) {
      data.pressed[key] = false
      data.released[key] = true
      emit(key, 'release', event)
      data.held[key] = event.time = 0
    }
  }

  function update() {
    var key
    for (key in data.tapped)
      data.tapped[key] = false
    for (key in data.released)
      data.released[key] = false
    for (key in data.pressed)
      if (data.held[key]) {
        var event = getEvent(key)
        emit(key, 'hold', event)
        data.held[key]++
        event.time++
      }
    window.requestAnimationFrame(update)
  }

  function getEvent(e) {
    var key
    if (typeof e === 'string')
      key = e
    else
      key = e.code
    var listeners = getListeners(key)
    var event = listeners.event
    if (!event) {
      var { key: char, keyCode: code } = e
      event = listeners.event = { key, char, code, time: 0, target: element }
    }
    return event
  }

  function getListeners(key) {
    var listeners = data[key]
    if (!listeners)
      listeners = data[key] = { press: [], tap: [], hold: [], release: [], event: null }
    return listeners
  }
}
