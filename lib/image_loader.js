let SpriteSheet = require('./sprite_sheet.js')
let createMask = require('./create_mask.js')

function ImageLoader (path, unitCanvas, maskCanvas) {
  // if (!SpriteSheet.prototype.hasImage(path)) {
  //   return SpriteSheet.prototype.map[path];
  // }

  var image = new Image();
  image.onload = function () {
    unitCanvas.width = image.width;
    unitCanvas.height = image.height;
    maskCanvas.width = image.width;
    maskCanvas.height = image.height;
    if (unit.width == undefined || unit.width == null) {
      unit.width = image.width;
      unit.height = image.height;
    }
    unitCanvas.context.drawImage(image, 0, 0);
    createMask(unitCanvas, maskCanvas);
  }

  image.src = path.toLowerCase();
  SpriteSheet.prototype.map[path] = [unitCanvas, maskCanvas];
};

module.exports = ImageLoader
