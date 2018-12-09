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
