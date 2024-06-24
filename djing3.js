let canvas;
let shapeType = 'circle'; 

let circleSize = 50;
let lineLength = 100;

let bgColor; 

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas-container');
  bgColor = color(0, 100, 200); 

  createBgColorButtons();

  createShapeButtons();

  let controls = select('#controls');
controls.style('background-color', 'rgba(34, 34, 34, 0.8)');
controls.style('padding', '10px');
controls.style('border-radius', '5px');
controls.style('z-index', '1000');
controls.style('position', 'fixed');
controls.style('bottom', '0');
controls.style('right', '20px');

controls.style('display', 'flex'); 
controls.style('justify-content', 'space-between'); 

controls.style('height', 'fit-content');


}

function draw() {
  background(bgColor);


  let circleX = map(mouseX, 0, width, 0, width);
  let circleY = map(mouseY, 0, height, 0, height);
  let lineX = map(mouseX, 0, width, width, 0);
  let lineY = map(mouseY, 0, height, height, 0);

  
  switch (shapeType) {
    case 'circle':
      fill(255, 100, 200); 
      ellipse(circleX, circleY, circleSize, circleSize);
      break;
    case 'square':
      fill(255, 100, 200); 
      rect(circleX - circleSize / 2, circleY - circleSize / 2, circleSize, circleSize);
      break;
    case 'polygon':
      fill(255, 100, 200); 
      drawPolygon(circleX, circleY, 6, circleSize / 2); 
      break;
  }

  stroke(255, 100, 200); 
  strokeWeight(4);
  line(width / 2, height / 2, lineX, lineY);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function createBgColorButtons() {
  let controls = select('#controls');

  let blueButton = createButton('Blue');
  blueButton.parent(controls);
  blueButton.mousePressed(function() {
    bgColor = color(0, 100, 200);
  });
  blueButton.class('bg-color-button');

  let pinkButton = createButton('Yellow');
  pinkButton.parent(controls);
  pinkButton.mousePressed(function() {
    bgColor = color(255, 255, 139);
  });
  pinkButton.class('bg-color-button');
}

function createShapeButtons() {
  let controls = select('#controls');

 
  let circleButton = createButton('Circle');
  circleButton.parent(controls);
  circleButton.mousePressed(function() {
    shapeType = 'circle';
  });
  circleButton.class('shape-button');

  
  let squareButton = createButton('Square');
  squareButton.parent(controls);
  squareButton.mousePressed(function() {
    shapeType = 'square';
  });
  squareButton.class('shape-button');

  let polygonButton = createButton('Polygon');
  polygonButton.parent(controls);
  polygonButton.mousePressed(function() {
    shapeType = 'polygon';
  });
  polygonButton.class('shape-button');
}

function drawPolygon(x, y, sides, radius) {
  beginShape();
  for (let i = 0; i < sides; i++) {
    let angle = TWO_PI / sides * i;
    let px = x + cos(angle) * radius;
    let py = y + sin(angle) * radius;
    vertex(px, py);
  }
  endShape(CLOSE);
}
