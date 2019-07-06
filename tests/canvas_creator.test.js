const canvasCreator = require('../lib/canvas_creator.js')
document = require('../lib/helpers.js').document

// test.todo('Work out how to implement this test cause document is not available')
test('Canvas is on the DOM', function () {
  expect(canvasCreator(20, 30)).toBe(canvasMock)
  expect(canvasCreator(20, 30).width).toBe(20)
  expect(canvasCreator(20, 30).height).toBe(30)
})
