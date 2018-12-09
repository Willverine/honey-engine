const canvasCreator = require('../lib/canvas_creator.js')

// test.todo('Work out how to implement this test cause document is not available')
test('Canvas is on the DOM', function () {
  canvasMock = {
    style: { borderColor: 0 },
    getContext: function () { return true }
  }
  document = {
    createElement: function () { return canvasMock },
    body: {
      appendChild: function () {}
    }
  }

  expect(canvasCreator(20, 30)).toBe(canvasMock)
  expect(canvasCreator(20, 30).width).toBe(20)
  expect(canvasCreator(20, 30).height).toBe(30)
})
