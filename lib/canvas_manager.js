let CreateCanvas = require('./canvas_creator.js')
let Point = require('./point.js')

function CanvasManager (width, height) {
  // the game canvas is actually THREE canvases
  // each canvas draws a different layer of the game.
  // Menu items are always guaranteed to be drawn on top of any game sprites,
  // and therefore it can be drawn above the game canvas, which could even be done in parallel
  this.width = width
  this.height = height
  this.worldCanvas = CreateCanvas(width, height)
  this.spriteCanvas = CreateCanvas(width, height)
  this.menuCanvas = CreateCanvas(width, height)
  this.point = new Point(200, 200)
  this.worldCanvas.origin = this.point
  this.spriteCanvas.origin = this.point
  this.menuCanvas.origin = this.point

  this.clearCanvas = function () {
    this.worldCanvas.context.clearRect(0, 0, this.width, this.height)
    this.spriteCanvas.context.clearRect(0, 0, this.width, this.height)
    this.menuCanvas.context.clearRect(0, 0, this.width, this.height)
  }
  // currently only mouse up is listened for so no click and drag yet
  // this.menuCanvas.addEventListener('mouseup', updateMouseUp, false)
  // this.menuCanvas.addEventListener('mousedown', updateMouseDown, false)
  // this.menuCanvas.addEventListener('mousemove', updateMouseMove, false)
  // Client.focusCanvas = this.menuCanvas

  // why there?
  // I dont think a canvas element can listen for KEYBOARD events?
  // document.addEventListener('keydown', updateKeys, false)
  // document.addEventListener('keyup', updateKeys, false)

  function init (canvas) {
    canvas.addEventListener('touchstart', touchHandler, true)
    canvas.addEventListener('touchmove', touchHandler, true)
    canvas.addEventListener('touchend', touchHandler, true)
    canvas.addEventListener('touchcancel', touchHandler, true)
  }
  init(this.menuCanvas)
}

function touchHandler (event) {
  let touches = event.changedTouches
  let first = touches[0]
  let type = ''
  switch (event.type) {
    case 'touchstart': type = 'mousedown'; break
    case 'touchmove': type = 'mousemove'; break
    case 'touchend': type = 'mouseup'; break
    default: return
  }

  let simulatedEvent = document.createEvent('MouseEvent')
  simulatedEvent.initMouseEvent(
    type, true, true, window, 1,
    first.screenX, first.screenY,
    first.clientX, first.clientY, false,
    false, false, false, 0, null
  )
  first.target.dispatchEvent(simulatedEvent)
  event.preventDefault()
}

module.exports = CanvasManager
