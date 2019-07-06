console = require('../lib/helpers.js').console
document = require('../lib/helpers.js').document
window = require('../lib/helpers.js').window

test('debug mode is off and console is overwritten', function () {
  expect(console.error('meemes')).toBe(false)
})

test('debug mode is on and console is available', function () {
  DEBUG = true
  expect(console.error('memes')).toBe(undefined)
})

test('document is overwritten', function () {
  expect(Object.keys(document)).toEqual([
    'body',
    'createElement',
    'querySelector',
  ])
})

test('window is overwritten', function () {
  expect(Object.keys(window)).toEqual([
    'innerWidth',
    'innerHeight',
    'onload',
  ])
})
