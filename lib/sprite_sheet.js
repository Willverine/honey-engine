function SpriteSheet (imagePath, unit) {
  var img = loadImage(imagePath, this.mask, unit);
  this.image = img[0];
  this.mask = img[1];
  this.point = unit.point
  var that = this;

  return function () {
    unit.canvas.context.drawImage(
      that.image,//spritesheet
      Math.floor(unit.frame) * unit.width,//source X distance
      unit.states[unit.state[unit.state.length-1]]["rowNumber"] * unit.height,//source Y disatance
      unit.width,//source width
      unit.height,//source height
      that.point.x + unit.canvas.origin.x - (unit.width/2),//destination x
      that.point.y + unit.canvas.origin.y - (unit.height),//destination Y
      unit.width,//width to draw image on the destination
      unit.height//can be modified for scaling and shit
    );

    if (unit.mask) {
      that.maskCanvas.context.drawImage(
        that.mask,
        Math.floor(unit.frame) * unit.width,//source X distance
        unit.states[unit.state[unit.state.length-1]]["rowNumber"] * unit.height,//source Y disatance
        unit.width,//source width
        unit.height,//source height
        that.point.x + unit.canvas.origin.x - (unit.width/2),//destination x
        that.point.y + unit.canvas.origin.y - unit.height,//destination Y
        unit.width,//width to draw image on the destination
        unit.height//can be modified for scaling and shit
      )
    }

    unit.frame = (unit.frame + unit.ticksPerFrame) % (unit.states[unit.state[unit.state.length-1]]["frames"]);
  }
}
SpriteSheet.prototype.map = {};
SpriteSheet.prototype.canvas = document.createElement('canvas');
SpriteSheet.prototype.canvas.context = SpriteSheet.prototype.canvas.getContext("2d");
SpriteSheet.prototype.mask = document.createElement('canvas');
SpriteSheet.prototype.mask.context = SpriteSheet.prototype.mask.getContext("2d");
SpriteSheet.prototype.hasImage = function (path) {
  if (!path) return false;
  return !(this.map[path] == undefined || this.map[path] == null)
}

module.exports = SpriteSheet
