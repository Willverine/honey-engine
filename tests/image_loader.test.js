const ImageLoader = require('../lib/image_loader')
// console = require('../lib/helpers.js').console
// global.document = require('../lib/helpers.js').document
canvasMock = require('../lib/helpers.js').canvasMock

test('image loader returns a ', function () {
  // expect(clientx.screenLength).toBe(0)
  expect(ImageLoader('./test.jpg', canvasMock, canvasMock)).toBe(undefined)
})
