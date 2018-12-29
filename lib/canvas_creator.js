function createCanvas (width, height) { // creates a canvas and sets some generic properties on it
  if (typeof document === undefined) return false

  var canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  canvas.style.borderColor = 'black'
  document.body.appendChild(canvas)
  canvas.context = canvas.getContext('2d')
  return canvas
}

module.exports = createCanvas
