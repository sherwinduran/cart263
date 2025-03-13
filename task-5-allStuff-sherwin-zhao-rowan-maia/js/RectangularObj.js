class RectangularObj {
  constructor(x, y, w, h, f_color, s_color, context) {
    // We write instructions to set up a Flower here
    // Position and size information
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.fill_color = f_color;
    this.stroke_color = s_color;
    this.startAngle = 0;
    this.endAngle = Math.PI * 2; //full rotation
    this.context = context;
    
    this.vx = 1;
    this.vy = 1;
    this.grow = 0.1;
  }


  display() {
    this.context.fillStyle = this.fill_color; // change the color we are using
    this.context.strokeStyle = this.stroke_color; // change the color we are using

    this.context.fillRect(this.x, this.y,this.width, this.height);
    this.context.lineWidth = 2; //change stroke
    this.context.strokeRect(this.x, this.y,this.width, this.height);

    this.update();
  }

  update(){
    this.x += this.vx; // move rect
    this.y += this.vy;
    this.width += this.grow;
    this.height += this.grow;

    // on collisions with border, change direction, speed and size
    if (this.x >= this.context.canvas.width - this.width || this.x <= 0) {
      this.vx *= -1;
      this.changeColor();
      this.changeSize();
    } 
    if (this.y >= this.context.canvas.height - this.height || this.y <= 0) {
      this.vy *= -1;
      this.changeColor();
      this.changeSize();
    }

  }

  changeColor(){ //change color on contact with border
    this.fill_color = this.getRandomColor();
  };

  getRandomColor() { //generate and update color
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  changeSize(){ // invert the grow direction
    this.grow *=-1; 
  };
}

function animate() {
  requestAnimationFrame(animate);
}
