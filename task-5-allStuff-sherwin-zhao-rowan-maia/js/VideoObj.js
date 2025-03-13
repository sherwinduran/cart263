class VideoObj {
  constructor(x, y, w, h, videoElement, context) {
    this.videoElement = videoElement;
    this.context = context;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.shapeX = 10;
    this.shapeY =10;
    this.shapeCol = "#000000";


    // Initialize filter values
    this.userProvidedBlur = 0;
    this.userProvidedSepia = 0;
    this.userProvidedHue = 0;
    this.userProvidedInvert = 0;
    let self = this;
 
    // Blur filter setup
    let filterButton_blur = document.getElementById("filter_button_blur");
    let blurInput = document.getElementById("blurnum");
   

    filterButton_blur.addEventListener("input", function () {
      //get value from input field
      self.userProvidedBlur = blurInput.value;
      self.display(); // Re-draw the video
      console.log(self.userProvidedBlur);
    });

    // Sepia filter setup
    let filterButton_sepia = document.getElementById("filter_button_sepia");
    let sepiaInput = document.getElementById("sepianum");

    filterButton_sepia.addEventListener("input", function () {
      self.userProvidedSepia = sepiaInput.value;
      self.display(); // Re-draw the video
      console.log(self.userProvidedSepia);
    });

    // Hue-rotate filter setup
    let filterButton_hue = document.getElementById("filter_button_hue");
    let hueInput = document.getElementById("huenum");

    filterButton_hue.addEventListener("input", function () {
      self.userProvidedHue = hueInput.value;
      self.display(); // Re-draw the video
      console.log(self.userProvidedHue);
    });

    // Invert filter setup
    let filterButton_invert = document.getElementById("filter_button_invert");
    let invertInput = document.getElementById("invertnum");

    filterButton_invert.addEventListener("input", function () {
      self.userProvidedInvert = invertInput.value;
      self.display(); // Re-draw the video
      console.log(self.userProvidedInvert);
    });


    // Set up simple mouse tracking on the canvas
    const canvas = document.getElementById("partD");
    if (canvas) {
      canvas.addEventListener("mousemove", function(event) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        self.updatePositionRect(mouseX, mouseY);
      });
      
      canvas.addEventListener("click", function() {
        const randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
        self.changeColor(randomColor);
      });
    }
  }

  display() {

    this.context.save();
     //apply each filter with the correct units
     this.context.filter = 
     `blur(${this.userProvidedBlur}px) ` + 
     `sepia(${this.userProvidedSepia}) ` +
     `hue-rotate(${this.userProvidedHue}deg) ` +
     `invert(${this.userProvidedInvert})`;
   
   // Log the filter string to debug
   console.log("Filter string:", this.context.filter);
   
   // Draw the video
   this.context.drawImage(this.videoElement, this.x, this.y, this.w, this.h);
   
   // Draw the rectangle (without filters)
   this.context.restore();  // Restore to remove filters for the rectangle
   this.context.save();     // Save again for the rectangle
   
   this.context.fillStyle = this.shapeCol;
   this.context.fillRect(this.shapeX, this.shapeY, 50, 50);
   
   // Restore context to original state
   this.context.restore();
  }

    //called when rectangle color is to be updated
  changeColor(newCol){
    this.shapeCol = newCol;
    console.log("Rectangle color changed to:", newCol);
  }
  //called when rectangle Pos is to be updated
  updatePositionRect(mx,my){
    this.shapeX = mx;
    this.shapeY = my;
    this.display();
  }
  update(videoElement) {
    this.videoElement = videoElement;
  }
}
