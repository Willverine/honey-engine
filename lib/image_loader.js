let SpriteSheet = require('./sprite_sheet.js')

function ImageLoader (path, mask, unit) {
  if (!SpriteSheet.prototype.hasImage(path)) {
    return SpriteSheet.prototype.map[path];
  }

  if (SpriteSheet.prototype.map[path] == undefined || SpriteSheet.prototype.map[path] == null) {
    var image = new Image();

    image.onload = function () {
      canvas.width = image.width;
      canvas.height = image.height;
      mask.width = image.width;
      mask.height = image.height;
      if (unit.width == undefined || unit.width == null) {
        unit.width = image.width;
        unit.height = image.height;
      }
      canvas.context.drawImage(image, 0, 0);
      createMask(canvas, mask);
    }
    image.src = path.toLowerCase();
    SpriteSheet.prototype.map[path] = [canvas,mask];
  }
};

module.exports = ImageLoader
