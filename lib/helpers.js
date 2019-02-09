const {JSDOM} = require("jsdom")
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window

Console = (function (oldCons) {
    return {
      error: function (text) {
        if (typeof DEBUG === 'undefined') return false
        oldCons.log(text);
      }
    };
}(console));

canvasMock = {
  style: { borderColor: 0 },
  getContext: jest.fn(function () { return true }),
  addEventListener: jest.fn()
}

elementMock = {
  appendChild: jest.fn(function () { return true })
}

Document = {
  body: {
    appendChild: jest.fn()
  },
  createElement: jest.fn(function () { return canvasMock }),
  querySelector: jest.fn(function () { return elementMock })
}

Window = {
  innerWidth: 1280,
  innerHeight: 720,
  onload: jest.fn()
}

module.exports.console = Console
module.exports.document = Document
module.exports.window = Window
module.exports.canvasMock = canvasMock
