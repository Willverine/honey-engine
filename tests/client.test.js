console = require('../lib/helpers.js').console
document = require('../lib/helpers.js').document
window = require('../lib/helpers.js').window
window.innerWidth = 1280
window.innerHeight = 720

const Client = require('../lib/client')
canvasMock = require('../lib/helpers.js').canvasMock

test('Client is set with default properties', function () {
  let client = Client
  expect(client.stateStack).toBe(require('../lib/state_stack.js'))
  expect(client.peekState).toBe(null)
  expect(client.focusCanvas).toBe(null)
  expect(client.numPlayers).toBe(0)
  expect(client.players).toEqual([])
  expect(client.clientX).toBe(0)
  expect(client.clientY).toBe(0)
  expect(client.screenHeight).toBe(0)
  expect(client.screenLength).toBe(0)
})

test('Client is loaded to expected starting properties', function () {
  let client = Client
  client.load()

  expect(client.stateStack).toBe(require('../lib/state_stack.js'))
  expect(client.peekState).toBe(null)
  expect(client.focusCanvas).toBe(null)
  expect(client.numPlayers).toBe(0)
  expect(client.players).toEqual([])
  expect(client.clientX).toBe(0)
  expect(client.clientY).toBe(0)
  expect(client.screenHeight).toBe(720)
  expect(client.screenLength).toBe(1280)
  expect(client.gameCanvas.width).toBe(100)
  expect(client.gameCanvas.height).toBe(100)
})
