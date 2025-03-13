class FreeStyleObj {
  constructor(x, y, length, f_color, s_color, context) {
    // We write instructions to set up a Flower here
    // Position and size information
    this.x = x;
    this.y = y;
    this.fill_color = f_color;
    this.stroke_color = s_color;
    this.theta = 0;
    this.length = length;
    this.yOffset = 20;
    this.angularSpeed = .07;
    this.context = context;

    this.angularSpeed = 0.07;
    this.amplitude = 5; // Initial amplitude for wave effect

  }

  display() {
    this.theta = 0; //reset everytime
    this.context.fillStyle = this.fill_color; // change the color we are using
    this.context.strokeStyle = this.stroke_color; // change the color we are using
    this.context.beginPath();
    this.context.moveTo(this.x, this.y)

    for (let i = this.x; i < this.x + this.length; i++) {
      this.context.lineTo(i, (Math.sin(this.theta) * 5) + this.y)
      this.context.lineTo(i, (Math.sin(this.theta) * 5) + this.y + this.yOffset)
      this.theta += this.angularSpeed;
    }

    this.context.stroke(); //set the stroke
  }

  update(micInput) {
    //update freestyle
    // console.log("free style update")
    // this.x+=1;

    // Check if micInput is a valid number
    if (isNaN(micInput) || micInput === undefined) {
      //console.warn("Mic input is NaN or undefined, skipping update.");
      return; // Stop update if micInput is invalid
    }

    // Dynamically change properties based on microphone input
    this.amplitude = micInput * 100; // Scale mic input to affect amplitude
    this.angularSpeed = 0.05 + (micInput * 0.3); // Adjust wave speed

    //console.log("Updated Amplitude:", this.amplitude, "Updated Angular Speed:", this.angularSpeed);

  }
}

// Microphone Setup
async function getMicrophoneInput(updateFunc) {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const microphone = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    microphone.connect(analyser);

    function analyzeAudio() {
      analyser.getByteFrequencyData(dataArray);
      let average = dataArray.reduce((sum, val) => sum + val, 0) / dataArray.length;
      let micInput = average / 255; // Normalize between 0 and 1

      //console.log("Mic Input:", micInput); // Check if values are coming in

      updateFunc(micInput);
      requestAnimationFrame(analyzeAudio);
    }

    analyzeAudio();
  } catch (err) {
    console.error("Microphone access denied", err);
  }
}