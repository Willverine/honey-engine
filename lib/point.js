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
