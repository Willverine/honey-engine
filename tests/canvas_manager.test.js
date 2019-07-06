const CanvasManager = require('../lib/canvas_manager.js')
document = require('../lib/helpers.js').document

test('StateStack pushes a new state', function () {
  let canvasManager = new CanvasManager(100, 200)
  expect(canvasManager !== undefined).toBe(true)
  expect(canvasManager.worldCanvas.width === 100).toBe(true)
  expect(canvasManager.worldCanvas.height === 200).toBe(true)
})
