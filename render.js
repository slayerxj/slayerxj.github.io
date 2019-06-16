
const canvasWidth = 700;
const canvasHeight = 300;
const lineLength = 216;
const strokeWidth = 6;
const drawPieceTime = 200;

// It seems that the width and height attributes determine the width or height of the canvas's coordinate system,
// whereas the CSS properties just determine the size of the box in which it will be shown.
let canvases = document.getElementsByTagName("canvas");
for (let i = 0; i < canvases.length; i++) {
    canvases[i].width = canvasWidth;
    canvases[i].height = canvasHeight;
}

let background = document.getElementById('background');
var backgroundCtx = background.getContext("2d");
backgroundCtx.fillStyle = "#14bdac";
backgroundCtx.fillRect(0, 0, canvasWidth, canvasHeight);

let board = document.getElementById('board');
var boardCtx = board.getContext("2d");

drawBoard();

let startTime = undefined;

let pieces = document.getElementById('pieces');
var piecesCtx = pieces.getContext("2d");
piecesCtx.webkitImageSmoothingEnabled = true;

pieces.addEventListener('click', function (e) {
    handleClick(e);
});

function drawBoard() {
    boardCtx.beginPath();

    boardCtx.moveTo(242, 114);
    boardCtx.lineTo(458, 114);

    boardCtx.moveTo(242, 186);
    boardCtx.lineTo(458, 186);

    boardCtx.moveTo(314, 42);
    boardCtx.lineTo(314, 258);

    boardCtx.moveTo(386, 42);
    boardCtx.lineTo(386, 258);

    boardCtx.lineWidth = 6;
    boardCtx.strokeStyle = "#0da192";
    boardCtx.stroke();
}

function drawO() {
    if (startTime === undefined) {
        startTime = (new Date()).getTime();
    }
    piecesCtx.clearRect(point.x, point.y, 68, 68);
    var time = (new Date()).getTime();
    piecesCtx.strokeStyle = '#f2ebd3';
    piecesCtx.lineWidth = 5.5;
    piecesCtx.beginPath();
    piecesCtx.arc(point.x + 34, point.y + 34, 20.5, -0.5 * Math.PI, (2 * ((time - startTime) / drawPieceTime) - 0.5) * Math.PI);
    piecesCtx.stroke();
    piecesCtx.closePath();
    if ((time - startTime) <= drawPieceTime) {
        window.requestAnimationFrame(drawO);
    } else {
        startTime = undefined;
    }
}

function drawX() {
    if (startTime === undefined) {
        startTime = (new Date()).getTime();
    }
    // piecesCtx.clearRect(point.x, point.y, 68, 68);
    var time = (new Date()).getTime();
    piecesCtx.strokeStyle = '#545454';
    piecesCtx.lineWidth = 5.5;
    piecesCtx.beginPath();
    piecesCtx.moveTo(point.x + 14, point.y + 14);
    piecesCtx.lineTo(point.x + 14 + (time - startTime) / drawPieceTime * 40, point.y + 14 + (time - startTime) / drawPieceTime * 40);
    piecesCtx.stroke();

    piecesCtx.moveTo(point.x + 14 + 40, point.y + 14);
    piecesCtx.lineTo(point.x + 14 + 40 - (time - startTime) / drawPieceTime * 40, point.y + 14 + (time - startTime) / drawPieceTime * 40);
    piecesCtx.stroke();
    piecesCtx.closePath();
    if ((time - startTime) <= drawPieceTime) {
        window.requestAnimationFrame(drawX);
    } else {
        startTime = undefined;
    }
}
