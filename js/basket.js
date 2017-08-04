let Basket = function(data) {
  Movable.call(this, data);
}

Basket.prototype = new Movable();

Basket.prototype.reset = function() {
  this.x = canvas.width / 2 - this.width / 2;
  this.y = canvas.height - this.height;

while (this.color == this.oldColor) {
  this.color = RGBCatcher.colors[Math.round(rand(0, (RGBCatcher.colors.length-1)))]
}
  this.oldColor = this.color
}

Basket.prototype.move = function() {
  if (keyOn[37]) {
    this.x -= this.xSpeed;
  }

  if (keyOn[39]) {
    this.x += this.xSpeed;
  }

  if (this.x > 0) {
    this.x = 0;
  }

  if (this.x + this.width < canvas.width) {
    this.x = canvas.width - this.width;
  }
}

Basket.prototype.draw = function() {
  context.fillStyle = this.color;

  context.fillRect(this.x, this.y, this.width, this.height);
}
