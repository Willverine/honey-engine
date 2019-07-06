(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function createCanvas (width, height) { // creates a canvas and sets some generic properties on it
  if (typeof document === undefined) return false

  var canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  canvas.style.borderColor = 'black'
  canvas_wrapper = document.querySelector('.canvases')
  canvas_wrapper.appendChild(canvas)
  canvas.context = canvas.getContext('2d')
  return canvas
}

module.exports = createCanvas

},{}],2:[function(require,module,exports){
let CreateCanvas = require('./canvas_creator.js')
let Point = require('./point.js')

function CanvasManager (width, height) {
  // the game canvas is actually THREE canvases
  // each canvas draws a different layer of the game.
  // Menu items are always guaranteed to be drawn on top of any game sprites,
  // and therefore it can be drawn above the game canvas, which could even be done in parallel
  this.width = width
  this.height = height
  this.worldCanvas = CreateCanvas(width, height)
  this.spriteCanvas = CreateCanvas(width, height)
  this.menuCanvas = CreateCanvas(width, height)
  this.point = new Point(200, 200)
  this.worldCanvas.origin = this.point
  this.spriteCanvas.origin = this.point
  this.menuCanvas.origin = this.point

  this.clearCanvas = function () {
    this.worldCanvas.context.clearRect(0, 0, this.width, this.height)
    this.spriteCanvas.context.clearRect(0, 0, this.width, this.height)
    this.menuCanvas.context.clearRect(0, 0, this.width, this.height)
  }

  function init (canvas) {
    canvas.addEventListener('touchstart', touchHandler, true)
    canvas.addEventListener('touchmove', touchHandler, true)
    canvas.addEventListener('touchend', touchHandler, true)
    canvas.addEventListener('touchcancel', touchHandler, true)
    canvas.addEventListener("mouseup", touchHandler, true);
    canvas.addEventListener("mousedown", touchHandler, true);
  }
  init(this.menuCanvas)
}

function touchHandler (event) {
  console.log('event')
  console.log(event)
  let touches = event.changedTouches
  let first = touches[0]
  let type = ''
  switch (event.type) {
    case 'touchstart': type = 'mousedown'; break
    case 'touchmove': type = 'mousemove'; break
    case 'touchend': type = 'mouseup'; break
    default: return
  }

  let simulatedEvent = document.createEvent('MouseEvent')
  simulatedEvent.initMouseEvent(
    type, true, true, window, 1,
    first.screenX, first.screenY,
    first.clientX, first.clientY, false,
    false, false, false, 0, null
  )
  first.target.dispatchEvent(simulatedEvent)
  event.preventDefault()
}

module.exports = CanvasManager

},{"./canvas_creator.js":1,"./point.js":4}],3:[function(require,module,exports){
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

window.onload = function () {
  Client.load()
}
module.exports = Client

},{"./canvas_manager.js":2,"./state_stack.js":5}],4:[function(require,module,exports){
/*
Object Discription:
Point object: Maintains an X, Y and Z value.
(z is probably for drawing order).
contains operations for modifying positions and what not.
*/

//requiremenets: (require JS)
//var thing = require(things.js);


//object declaration:
function Point (x,y,z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.xmod = 0;
    this.ymod = 0;
    this.zmod = 0;
}
//add prototype methods:
//getters: Gets X value
Point.prototype.getX = function () {
    return this.x + this.xmod;
    //reset xmod after every call?
};
//Gets Y value
Point.prototype.getY = function () {
    return this.y + this.ymod;
};
//Gets Z value
Point.prototype.getZ = function () {
    return this.z + this.zmod;
};
//modifies a Value (x,y,z) as a temporary increase or whatever (like on mouse Over);
Point.prototype.modX = function (mod) {
    this.xmod = mod;
};
Point.prototype.modY = function (mod) {
    this.ymod = mod;
};
Point.prototype.modZ = function (mod) {
    this.zmod = mod;
};
Point.prototype.new = function () {
    return new Point(this.x,this.y);
}
Point.prototype.serialise = function (totalOutput, objects) {
    var outputArray = {};
    totalOutput.push(outputArray);
    objects.set(this, totalOutput.length-1);
    for (i in this) {
        if (i == 'canvas') { return false; }
        if (typeof this[i] === "object") {
            if (objects.get(this[i]) === undefined) {//if object has not been seen:
                if (this[i].serialise != undefined) {
                    objects.set(this[i],totalOutput.length);//set it to a new index
                    outputArray[i] = '#' + (totalOutput.length);//push its index ref on the list:
                    this[i].serialise(totalOutput,objects);
                } else {
                    console.log('probably needs functions: ', this[i]);
                }
            } else {//object has been seen before:
                outputArray[i] = '#' + objects.get(this[i]);//add it on with the ref.
            }
        } else if (typeof this[i] === "boolean") {
            outputArray[i] = this[i];
        } else if (typeof this[i] === "number") {
            outputArray[i] = '$' + this[i];
        } else if (typeof this[i] === "string") {
            outputArray[i] = this[i];
        }
    }
    outputArray.constr = 'point.js';
}


//add other utility functions:



//export:
module.exports = Point;
//end

},{}],5:[function(require,module,exports){
function StateStack () {
  this.stack = []
  this.peekState = undefined
  this.pushState = function (newState) {
    if (newState === undefined || newState === null) return false

    if (newState.type !== 'State') { console.error('Not a state pushed'); return false }

    this.peekState = newState // direct reference to the current top of stack

    this.stack.push(newState) // push on the new state

    return newState
  }

  this.popState = function () {
    if (this.stack.length <= 0) { console.error('Cannot pop empty StateStack'); return false }

    if (this.stack.length === 1) {
      this.peekState = undefined
    } else {
      this.peekState = this.stack[this.stack.length - 2] // set reference to new top of stack
    }

    return this.stack.pop() // remove the current state ALSO SET TO NULL AND DELETE OR WHATEVER
  }
}

module.exports = StateStack

},{}]},{},[3]);
