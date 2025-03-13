class CircularObj {
  constructor(x, y, radius, f_color, s_color, context) {
    // We write instructions to set up a Flower here
    // Position and size information
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.fill_color = f_color;
    this.stroke_color = s_color;
    this.startAngle = 0;
    this.endAngle = Math.PI * 2; // full rotation
    this.context = context;
    this.xx = 0.01;
    this.xy = 0.01;
    this.colorChangeInterval = 5000;
    this.frameCount = 2;
  }

  display() {
    this.context.fillStyle = this.fill_color; // change the color we are using
    this.context.strokeStyle = this.stroke_color; // change the color we are using

    // draw the circle
    this.context.beginPath();
    this.context.arc(
      this.x,
      this.y,
      this.radius,
      this.startAngle,
      this.endAngle,
      true
    );
    this.context.fill(); // set the fill
    this.context.lineWidth = 5; //change stroke
    this.context.closePath();
    this.context.stroke();

    // update position and color change logic
    this.update();
  }

  update() {
    // move the circle
    this.x += this.xx;
    this.y += this.xy;

    // this will give a boundary detection
    // if the circle hits the left or right edge, reverse its horizontal direction
    if (this.x > this.context.canvas.width - this.radius || this.x < this.radius) this.xx *= -1;

    // if the circle hits the top or bottom edge, reverse its vertical direction
    if (this.y > this.context.canvas.height - this.radius || this.y < this.radius) this.xy *= -1;

    // this will change the color
    this.frameCount++;
    if (this.frameCount >= this.colorChangeInterval) {
      this.changeColor();
      this.frameCount = 0;
    }

    requestAnimationFrame(() => this.update());
  }

  // function to generate a random color
  changeColor() {
    this.fill_color = this.getRandomColor();
  }

  // generate a random hex color
  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}

function animate() {
  requestAnimationFrame(animate);
}
