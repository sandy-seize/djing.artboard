let canvas;
let shapeType = 'circle'; // 초기 도형은 원으로 설정

let circleSize = 50;
let lineLength = 100;

let bgColorPicker; // 배경 색상을 선택할 버튼

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas-container');
  bgColor = color(0, 100, 200); // 초기 배경 색상 설정 (블루와 핑크 계열)

  // 컨트롤 박스 생성
  let controls = createDiv().id('controls');
  controls.style('background-color', 'rgba(34, 34, 34, 0.8)');
  controls.style('padding', '10px');
  controls.style('border-radius', '5px');
  controls.style('z-index', '1000');
  controls.style('position', 'fixed');
  controls.position(20, 20);

  // 배경 색상 선택 버튼 생성
  createBgColorButtons(controls);

  // 도형 선택 버튼 생성
  createShapeButtons(controls);
}

function draw() {
  background(bgColor);

  // 마우스 위치에 따라 원의 크기와 선의 길이가 변화
  let circleX = map(mouseX, 0, width, 0, width);
  let circleY = map(mouseY, 0, height, 0, height);
  let lineX = map(mouseX, 0, width, width, 0);
  let lineY = map(mouseY, 0, height, height, 0);

  // 선택된 도형 그리기
  switch (shapeType) {
    case 'circle':
      fill(255, 100, 200); // 핑크 계열의 색상
      ellipse(circleX, circleY, circleSize, circleSize);
      break;
    case 'square':
      fill(255, 100, 200); // 핑크 계열의 색상
      rect(circleX - circleSize / 2, circleY - circleSize / 2, circleSize, circleSize);
      break;
    case 'polygon':
      fill(255, 100, 200); // 핑크 계열의 색상
      drawPolygon(circleX, circleY, 6, circleSize / 2); // 육각형 그리기 (예시)
      break;
  }

  // 선 그리기
  stroke(255, 100, 200); // 핑크 계열의 선 색상
  strokeWeight(4);
  line(width / 2, height / 2, lineX, lineY);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// 배경 색상 선택 버튼 생성 함수
function createBgColorButtons(parentElement) {
  let blueButton = createButton('Blue');
  blueButton.parent(parentElement);
  blueButton.mousePressed(function() {
    bgColor = color(0, 100, 200);
  });
  blueButton.class('bg-color-button');

  let pinkButton = createButton('Pink');
  pinkButton.parent(parentElement);
  pinkButton.mousePressed(function() {
    bgColor = color(255, 100, 200);
  });
  pinkButton.class('bg-color-button');
}

// 도형 선택 버튼 생성 함수
function createShapeButtons(parentElement) {
  // 원 선택 버튼 생성
  let circleButton = createButton('Circle');
  circleButton.parent(parentElement);
  circleButton.mousePressed(function() {
    shapeType = 'circle';
  });
  circleButton.class('shape-button');

  // 사각형 선택 버튼 생성
  let squareButton = createButton('Square');
  squareButton.parent(parentElement);
  squareButton.mousePressed(function() {
    shapeType = 'square';
  });
  squareButton.class('shape-button');

  // 다각형 선택 버튼 생성
  let polygonButton = createButton('Polygon');
  polygonButton.parent(parentElement);
  polygonButton.mousePressed(function() {
    shapeType = 'polygon';
  });
  polygonButton.class('shape-button');
}

// 다각형 그리기 함수 (예시)
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
