//
// var waves = new SineWaves({
//   el: document.getElementById('waves'),
//
//   speed: 4,
//
//   width: function() {
//     return $(window).width();
//   },
//
//   height: function() {
//     return $(window).height();
//   },
//
//   ease: 'SineInOut',
//
//   wavesWidth: '70%',
//
//   waves: [
//     {
//       timeModifier: 4,
//       lineWidth: 1,
//       amplitude: -25,
//       wavelength: 25
//     },
//     {
//       timeModifier: 2,
//       lineWidth: 2,
//       amplitude: -50,
//       wavelength: 50
//     },
//     {
//       timeModifier: 1,
//       lineWidth: 1,
//       amplitude: -100,
//       wavelength: 100
//     },
//     {
//       timeModifier: 0.5,
//       lineWidth: 1,
//       amplitude: -200,
//       wavelength: 200
//     },
//     {
//       timeModifier: 0.25,
//       lineWidth: 2,
//       amplitude: -400,
//       wavelength: 400
//     }
//   ],
//
//   // Called on window resize
//   resizeEvent: function() {
//     var gradient = this.ctx.createLinearGradient(0, 0, this.width, 0);
//     gradient.addColorStop(0,"rgba(23, 210, 168, 0.2)");
//     gradient.addColorStop(0.5,"rgba(255, 255, 255, 0.5)");
//     gradient.addColorStop(1,"rgba(23, 210, 168, 0.2)");
//
//     var index = -1;
//     var length = this.waves.length;
//     while(++index < length){
//       this.waves[index].strokeStyle = gradient;
//     }
//
//     // Clean Up
//     index = void 0;
//     length = void 0;
//     gradient = void 0;
//   }
// });

// old stuff, testing waves above^

// function restyle(){
//   var randomRed = Math.random() * 200;
//   var randomGreen = Math.random() * 200;
//   var randomBlue = Math.random() * 200;
//
//   var newColor = "radial-gradient(rgb(" + randomRed + "," + randomGreen + "," + randomBlue + "), rgb(" + randomRed + "," + randomGreen + "," + randomBlue + "), rgb(" + randomRed + "," + randomGreen + "," + randomBlue + "), rgb(" + randomRed + "," + randomGreen + "," + randomBlue + ") ";
//   outputShape.style.background = newColor;
//
// }


// color change
// var i = 0;
// function change() {
//   var circle = document.getElementById("gradientcircle");
//   var color = ["radial-gradient(#ffad42,#ffb759, #fffbb5, #fffbb5)", "radial-gradient(orange, pink, #fffbb5, #fffbb5)", "radial-gradient(blue, pink, #fffbb5, #fffbb5)", " radial-gradient(orange, yellow, #fffbb5, #fffbb5)"];
//   circle.style.background = color[i];
//   i = (i + 1) % color.length;
// }
// setInterval(change, 3000);

// size change
// var i = 0;
// function change() {
//   var circle = document.getElementById("gradientcircle");
//   var width = ["90vh","100vw", "110vw"];
//   circle.style.width = width[i];
//   circle.style.height = width[i];
//   i = (i + 1) % width.length;
// }
// setInterval(change, 1000);

// bouncing balls around screen
const container = document.querySelector('body');
const balls = document.querySelectorAll('.ball');
const containerWidth = container.clientWidth;
const containerHeight = container.clientHeight;
const ballSize = balls[0].clientWidth;
const speed = 2;
const maxSpeed = 3;

let ballPositions = [{
  x: 0,
  y: 0
}, {
  x: ballSize * 2,
  y: ballSize
}, {
  x: ballSize ,
  y: ballSize * 2
}, ];

let ballVelocities = [{
  x: speed,
  y: speed
}, {
  x: speed,
  y: -speed
}, {
  x: -speed,
  y: speed
}, ];

function animate() {
  balls.forEach((ball, ballIndex) => {
    ballPositions[ballIndex].x += ballVelocities[ballIndex].x;
    ballPositions[ballIndex].y += ballVelocities[ballIndex].y;

    if (ballPositions[ballIndex].x <= -ballSize/2) {
      ballVelocities[ballIndex].x = Math.abs(ballVelocities[ballIndex].x);
    }

    if (ballPositions[ballIndex].x >= containerWidth - ballSize/2) {
      ballVelocities[ballIndex].x = -Math.abs(ballVelocities[ballIndex].x);
    }

    if (ballPositions[ballIndex].y <= -ballSize/2) {
      ballVelocities[ballIndex].y = Math.abs(ballVelocities[ballIndex].y);
    }

    if (ballPositions[ballIndex].y >= containerHeight - ballSize/2) {
      ballVelocities[ballIndex].y = -Math.abs(ballVelocities[ballIndex].y);
    }

//overlap?
    // for (let i = 0; i < balls.length; i++) {
    //   if (i !== ballIndex) {
    //     const distance = Math.sqrt(
    //       Math.pow(ballPositions[i].x - ballPositions[ballIndex].x, 2) +
    //       Math.pow(ballPositions[i].y - ballPositions[ballIndex].y, 2)
    //     );
    //     if (distance < ballSize) {
    //       const tempX = ballVelocities[ballIndex].x;
    //       const tempY = ballVelocities[ballIndex].y;
    //       ballVelocities[ballIndex].x = ballVelocities[i].x;
    //       ballVelocities[ballIndex].y = ballVelocities[i].y;
    //       ballVelocities[i].x = tempX;
    //       ballVelocities[i].y = tempY;
    //     }
    //   }
    // }

    ball.style.transform = `translate(${ballPositions[ballIndex].x}px, ${ballPositions[ballIndex].y}px)`;
  });

  requestAnimationFrame(animate);
}

animate();

// stamp draw feature
let isDrawing = false;
let isDrawingModeActive = false;  // Track if drawing mode is active

const startDrawingButton = document.getElementById('animated-text-strip');
startDrawingButton.addEventListener('click', toggleDrawingMode);

function toggleDrawingMode() {
    if (isDrawingModeActive) {
        stopDrawingMode();  // Turn off drawing mode and remove circles
    } else {
        startDrawingMode();  // Start drawing mode
    }
}

function startDrawingMode() {
    isDrawingModeActive = true;
    document.body.addEventListener('mousedown', startDrawing);
    document.body.addEventListener('mouseup', stopDrawing);
}

function stopDrawingMode() {
    isDrawingModeActive = false;
    document.body.removeEventListener('mousedown', startDrawing);
    document.body.removeEventListener('mouseup', stopDrawing);

    // Remove all the circles
    const circles = document.querySelectorAll('.circle');
    circles.forEach(circle => circle.remove());

    document.body.classList.remove('no-select');  // Re-enable text/image selection
}

function startDrawing(event) {
    isDrawing = true;
    document.body.classList.add('no-select');  // Disable text/image selection
    document.body.addEventListener('mousemove', drawCircle);
}

function stopDrawing() {
    isDrawing = false;
    document.body.removeEventListener('mousemove', drawCircle);
}

function drawCircle(event) {
    if (!isDrawing) return;

    const circle = document.createElement('div');
    circle.classList.add('circle');
    circle.style.left = `${event.pageX - 10}px`; // Center the circle on the mouse
    circle.style.top = `${event.pageY - 10}px`;

    document.body.appendChild(circle);
}
