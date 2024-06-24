let canvas;
let drawings = []; // 모든 그리기 요소를 저장할 배열
let shapeType = 'circle'; // 초기 도형은 원으로 설정

let shapeSizeMin = 10; // 도형 최소 크기
let shapeSizeMax = 40; // 도형 최대 크기
let shapeSizeStep = 1; // 도형 크기 변화 단계

let drawInterval = 3; // 그리기 간격 (단위: 프레임)
let drawTimer = 0; // 타이머 변수

let drawIntervalSlider;
let maxShapeSizeSlider;

let backgroundColor; // 배경색 변수 추가

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvas-container');
    backgroundColor = color(0); // 초기 배경색 설정
    background(backgroundColor); // 배경을 초기 배경색으로 설정

    // 컨트롤 박스 생성
    let controls = createDiv().id('controls');
    controls.style('background-color', 'rgba(34, 34, 34, 0.8)');
    controls.style('padding', '10px');
    controls.style('border-radius', '5px');
    controls.style('z-index', '1000');
    controls.style('position', 'fixed');
    controls.position(20, 20);

    // 리셋 버튼 생성
    let resetButton = createButton('Reset');
    resetButton.parent(controls);
    resetButton.mousePressed(resetCanvas);
    resetButton.class('control-button');

    // 첫 번째 그룹: Slow, Slider, Fast
    let group1 = createDiv().parent(controls).style('margin-bottom', '10px');
    group1.style('display', 'flex');
    group1.style('align-items', 'center');

    let slowLabel = createP('Fast').style('color', 'white').style('margin-right', '10px');
    slowLabel.parent(group1);

    drawIntervalSlider = createSlider(1, 10, drawInterval);
    drawIntervalSlider.parent(group1);
    drawIntervalSlider.style('width', '100px');

    let fastLabel = createP('Slow').style('color', 'white').style('margin-left', '10px');
    fastLabel.parent(group1);

    // 두 번째 그룹: Small, Slider, Big
    let group2 = createDiv().parent(controls).style('margin-bottom', '10px');
    group2.style('display', 'flex');
    group2.style('align-items', 'center');

    let smallLabel = createP('Small').style('color', 'white').style('margin-right', '10px');
    smallLabel.parent(group2);

    maxShapeSizeSlider = createSlider(20, 100, shapeSizeMax);
    maxShapeSizeSlider.parent(group2);
    maxShapeSizeSlider.style('width', '100px');

    let bigLabel = createP('Big').style('color', 'white').style('margin-left', '10px');
    bigLabel.parent(group2);

    // 도형 선택 버튼 생성
    createShapeButtons(controls);
}

function draw() {
    // 배경색 변화
    background(lerpColor(backgroundColor, color(0, 0, 255), mouseX / width)); // 마우스 X 위치에 따라 파란색 배경으로 변화

    // 그리기 간격 조절
    drawInterval = drawIntervalSlider.value();

    // 최대 도형 크기 조절
    shapeSizeMax = maxShapeSizeSlider.value();

    for (let i = 0; i < drawings.length; i++) {
        let shape = drawings[i];

        // 도형 크기 변경
        shape.size += shape.sizeChange;
        if (shape.size > shapeSizeMax || shape.size < shapeSizeMin) {
            shape.sizeChange *= -1; // 크기 변화 반전
        }

        // 그림자 설정
        fill(255, 20); // 흰색의 그림자, 불투명도 20
        stroke(255); // 흰색 외곽선

        // 색상 랜덤 설정
        fill(shape.color);

        // 도형 그리기
        switch (shape.type) {
            case 'circle':
                ellipse(shape.x, shape.y, shape.size, shape.size); // 타원 그리기
                break;
            case 'square':
                rect(shape.x - shape.size / 2, shape.y - shape.size / 2, shape.size, shape.size); // 사각형 그리기
                break;
            case 'pentagon':
                drawPolygon(shape.x, shape.y, 5, shape.size / 2); // 오각형 그리기
                break;
            case 'hexagon':
                drawPolygon(shape.x, shape.y, 6, shape.size / 2); // 육각형 그리기
                break;
        }
    }

    // 그리기 간격 조절
    if (frameCount % drawInterval === 0 && mouseIsPressed) {
        // 마우스가 클릭된 상태에서만 도형을 그리도록
        let point = {
            x: mouseX,
            y: mouseY,
            type: shapeType,
            size: random(shapeSizeMin, shapeSizeMax),
            sizeChange: random(-shapeSizeStep, shapeSizeStep),
            color: color(random(200, 255), random(200, 255), random(200, 255)) // 밝은 색상으로 변경
        };
        drawings.push(point);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function resetCanvas() {
    drawings = []; // 그리기 배열을 비우기
    backgroundColor = color(0); // 배경색 초기화
    background(backgroundColor); // 배경을 초기 배경색으로 설정
}

function createShapeButtons(parentElement) {
    // 도형 선택 버튼 생성
    let circleButton = createButton('Circle');
    circleButton.parent(parentElement);
    circleButton.mousePressed(function() {
        shapeType = 'circle';
    });
    circleButton.class('shape-button');

    let squareButton = createButton('Square');
    squareButton.parent(parentElement);
    squareButton.mousePressed(function() {
        shapeType = 'square';
    });
    squareButton.class('shape-button');

    let pentagonButton = createButton('Pentagon');
    pentagonButton.parent(parentElement);
    pentagonButton.mousePressed(function() {
        shapeType = 'pentagon';
    });
    pentagonButton.class('shape-button');

    let hexagonButton = createButton('Hexagon');
    hexagonButton.parent(parentElement);
    hexagonButton.mousePressed(function() {
        shapeType = 'hexagon';
    });
    hexagonButton.class('shape-button');
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
