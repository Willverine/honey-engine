/*
* Client code for starting everything.
* Client manages state stack, one being the game itself.
* Init's with a mainmenu game state
* Client is the highest level of the game on the client side.
* Loads all the required information for the game to start.
*/

//  client object manages everything
var Client = {
  stateStack: require('./state_stack.js'), //  the stack states are read off
  peekState: null,
  focusCanvas: null,
  numPlayers: 0,
  players: [],
  clientX: 0,
  clientY: 0,
  screenHeight: 0,
  screenLength: 0
}

Client.load = function () {
  // this function should be run after document has loaded all the shit and what not and:
  // start the actual creation of canvases and start the drawProcess and whatnot.
  if (window.innerWidth > window.innerHeight) {
    Client.screenLength = window.innerWidth
    Client.screenHeight = window.innerHeight
  } else {
    Client.screenLength = window.innerHeight
    Client.screenHeight = window.innerWidth
  }

  canvasManager = require('./canvas_manager.js')
  // Client.gameCanvas = new canvasManager(Client.screenLength, Client.screenHeight)
  Client.gameCanvas = new canvasManager(100, 100)
}

<<<<<<< HEAD
window.onload = function () {
  Client.load()
}
=======
// Client.load()
>>>>>>> wip
module.exports = Client
