let canvas;
let drawings = [];
let shapeType = 'circle';
let shapeSizeMin = 10;
let shapeSizeMax = 40;
let shapeSizeStep = 1;
let drawInterval = 3;
let drawTimer = 0;
let drawIntervalSlider;
let maxShapeSizeSlider;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvas-container');
    background(0);


let openModalBtn = select('#open-modal-btn');
openModalBtn.mousePressed(openModal);
openModalBtn.class('modal-trigger'); 


let closeModalBtn = select('.close-btn');
closeModalBtn.mousePressed(closeModal);
closeModalBtn.class('close-btn'); 


createControls();
}

function draw() {
    drawInterval = drawIntervalSlider.value();
    shapeSizeMax = maxShapeSizeSlider.value();

    for (let i = 0; i < drawings.length; i++) {
        let shape = drawings[i];
        shape.size += shape.sizeChange;
        if (shape.size > shapeSizeMax || shape.size < shapeSizeMin) {
            shape.sizeChange *= -1;
        }

        fill(255, 20);
        stroke(255);
        fill(shape.color);

        switch (shape.type) {
            case 'circle':
                ellipse(shape.x, shape.y, shape.size, shape.size);
                break;
            case 'square':
                rect(shape.x - shape.size / 2, shape.y - shape.size / 2, shape.size, shape.size);
                break;
            case 'pentagon':
                drawPolygon(shape.x, shape.y, 5, shape.size / 2);
                break;
            case 'hexagon':
                drawPolygon(shape.x, shape.y, 6, shape.size / 2);
                break;
        }
    }

    if (frameCount % drawInterval === 0 && mouseIsPressed) {
        let point = {
            x: mouseX,
            y: mouseY,
            type: shapeType,
            size: random(shapeSizeMin, shapeSizeMax),
            sizeChange: random(-shapeSizeStep, shapeSizeStep),
            color: color(random(255), random(255), random(255))
        };
        drawings.push(point);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function resetCanvas() {
    drawings = [];
    background(0);
}

function createControls() {
   
    let controls = select('#controls');
    controls.html('');

    let resetButton = createButton('Reset');
    resetButton.parent(controls);
    resetButton.mousePressed(resetCanvas);
    resetButton.class('control-button');


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

   
    createShapeButtons(controls);
}

function createShapeButtons(parentElement) {
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

function openModal() {
    let modal = select('#controls-modal');
    modal.style('display', 'block');
}

function closeModal() {
    let modal = select('#controls-modal');
    modal.style('display', 'none');
}
