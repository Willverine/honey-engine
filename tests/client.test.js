const Client = require('../lib/client')

test('Client is set with default properties', function () {
  let client = Client
  expect(client.stateStack).toBe(require('../lib/state_stack.js'))
  expect(client.gameCanvas).toBe(require('../lib/canvas_creator.js'))
  // same for peekstate, etc
})

/*
  test('Client load method initialises default properties', funtion () {
  blah
})
*/
