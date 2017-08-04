let Movable = function(data) { //will give to block and baket as both are movable
  if (data === undefined) {
    return;
  }
  for (let i = 0; i < data.length; i++) {
    let setting = data[i]
    this[setting[0]] = setting[1];
  }
  this.alive = true;
};

Movable.prototype = {
  update: function() {
    if (this.alive) {
      this.move();
      this.draw();
    }
  }
};
