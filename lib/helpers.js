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

Document = {
  createElement: jest.fn(function () { return canvasMock }),
  body: {
    appendChild: jest.fn()
  }
}

module.exports.console = Console
module.exports.document = Document
module.exports.canvasMock = canvasMock
