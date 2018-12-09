const StateStack = require('../lib/state_stack.js')

test('StateStack pushes a new state', function () {
  let stateStack = new StateStack()
  let mockState = { type: 'State' }

  expect(stateStack !== undefined).toBe(true)
  expect(stateStack.pushState(undefined)).toBe(false)
  expect(stateStack.pushState(null)).toBe(false)
  expect(stateStack.pushState('bananas')).toBe(false)
  expect(stateStack.pushState(mockState)).toBe(mockState)
})

test('StateStack pops an old state', function () {
  let stateStack = new StateStack()
  let mockState = { type: 'State' }

  expect(stateStack.popState()).toBe(false)
  stateStack.pushState(mockState)
  expect(stateStack.popState()).toBe(mockState)
})

test('StateStack peakState keeps track of the correct state', function () {
  let stateStack = new StateStack()
  let mockState1 = { type: 'State', name: '1' }
  let mockState2 = { type: 'State', name: '2' }

  stateStack.pushState(mockState1)
  expect(stateStack.peekState).toBe(mockState1)
  stateStack.pushState(mockState2)
  expect(stateStack.peekState).toBe(mockState2)

  stateStack.popState()
  expect(stateStack.peekState).toBe(mockState1)
  stateStack.popState()
  expect(stateStack.peekState).toBe(undefined)
  stateStack.popState()
  expect(stateStack.peekState).toBe(undefined)
})
