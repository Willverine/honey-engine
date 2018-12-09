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
  gameCanvas: require('./canvas_creator.js'),
  peekState: null,
  focusCanvas: null,
  numPlayers: 0,
  players: [],
  clientX: 0,
  clientY: 0
}

Client.load = function () {
  // this function should be run after document has loaded all the shit and what not and:
  // start the actual creation of canvases and start the drawProcess and whatnot.
  Client.screenLength = 0
  Client.screenHeight = 0
  if (window.innerWidth > window.innerHeight) {
    Client.screenLength = window.innerWidth
    Client.screenHeight = window.innerHeight
  } else {
    Client.screenLength = window.innerHeight
    Client.screenHeight = window.innerWidth
  }
  Client.GameCanvas(Client.screenLength, Client.screenHeight)
}

module.exports = Client
