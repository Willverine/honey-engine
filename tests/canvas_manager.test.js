const CanvasManager = require('../lib/canvas_manager.js')

test('StateStack pushes a new state', function () {
  canvasMock = {
    style: { borderColor: 0 },
    getContext: jest.fn(function () { return true }),
    addEventListener: jest.fn()
  }
  document = {
    createElement: jest.fn(function () { return canvasMock }),
    body: {
      appendChild: jest.fn()
    }
  }

  let canvasManager = new CanvasManager(100, 200)
  expect(canvasManager !== undefined).toBe(true)
  expect(canvasManager.worldCanvas.width === 100).toBe(true)
  expect(canvasManager.worldCanvas.height === 200).toBe(true)
})
