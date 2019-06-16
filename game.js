let state = Array(9).fill(0);
let step = 0;
let isGameOver = false;
let isComputerThinking = false;
const audio = new Audio("ca.mp3");
var result = { undecided: -1, draw: 0, xWin: 1, oWin: 2 };

let winnerInfo = {};

function handleClick(event) {
    if (isGameOver) {
        // restart();
        return;
    }

    const rect = pieces.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    let index = coordinateToIndex({ x, y });
    if (index === -1) {
        return;
    }
    if (!isGameOver && !isComputerThinking && (state[index] === 0)) {
        state[index] = (step % 2 === 0) ? 1 : -1;
        move(index);

        if (!isGameOver) {
            isComputerThinking = true;
            setTimeout(() => {
                let bestMove = findBestMove(state);
                state[bestMove] = (step % 2 === 0) ? 1 : -1;
                move(bestMove);
                isComputerThinking = false;
            }, 500);
        }
    }
}

let restartButton = document.getElementById("restart");
restartButton.addEventListener('click', () => {
    restart();
});

let point;
function move(index) {
    let piece = (step % 2 === 0) ? 1 : -1;
    render(index, piece);
    audio.play();
    step++;
    let decision = judge(state);
    renderResult(decision);
}

function render(index, piece) {
    point = indexToCoordinate(index);
    if (piece === 1) {
        drawX();
    } else {
        drawO();
    }
}

function restart() {
    state = Array(9).fill(0);
    step = 0;
    isGameOver = false;
    clearBoard();
    drawBoard();
}
let defaultButton = document.getElementById('a');
defaultButton.style = "text-decoration: underline;";

let changeButton = document.getElementById("b");
changeButton.addEventListener('click', () => {
    change();
});

function change() {
    if ((step === 0) && !isGameOver && !isComputerThinking) {
        defaultButton.style = "text-decoration: none;";
        changeButton.style = "text-decoration: underline;";
        let bestMove = findBestMove(state);
        state[bestMove] = (step % 2 === 0) ? 1 : -1;
        move(bestMove);
    }
}

function renderResult(decision) {
    switch (decision) {
        case result.undecided:
            // document.getElementById("game-info").innerHTML = "Next move is " + ((step % 2 === 0) ? 'X' : 'O');
            break;
        case result.draw:
            isGameOver = true;
            setTimeout(() => {
                drawDraw();
            }, 500);
            break;
        case result.xWin:
            isGameOver = true;
            winnerInfo = collectWinnerInfo();
            drawVictory();
            break;
        case result.oWin:
            isGameOver = true;
            winnerInfo = collectWinnerInfo();
            drawVictory();
            break;
        default:
    }
}
