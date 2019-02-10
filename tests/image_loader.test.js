const ImageLoader = require('../lib/image_loader')
const SpriteSheet = require('../lib/sprite_sheet')
// console = require('../lib/helpers.js').console
// global.document = require('../lib/helpers.js').document
// canvasMock = require('../lib/helpers.js').canvasMock
canvasMock = createCanvas(200,200)

test('image loader creates a new spritesheet', function () {
  // expect(clientx.screenLength).toBe(0)
  let testPath = './test_fixtures/test.jpg'
  let newImage = ImageLoader(testPath, canvasMock, canvasMock)
  expect(newImage).toBe(undefined)
  expect(SpriteSheet.prototype.hasImage(testPath)).toBe(true)
})
