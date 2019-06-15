
let state = Array(9).fill(0);
let step = 0;
let isGameOver = false;
let isComputerThinking = false;
const audio = new Audio("kata.mp3");
const result = { undecided: -1, draw: 0, xWin: 1, oWin: 2 };

const linesToCheck = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const buttons = document.getElementsByClassName("square");
for (let i = 0; i < buttons.length; i++) {
    buttons[i].id = i;
    buttons[i].addEventListener('click', handleClick);
}

function change() {
    state[0] = 1;
    document.getElementById("change").disabled = true;
    step++;
    render();
    judge();
}

function reset() {
    state = Array(9).fill(0);
    step = 0;
    isGameOver = false;
    render();
    document.getElementById("game-info").innerHTML = "Human first";
    document.getElementById("change").disabled = false;
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.background = "";
    }
}

function render() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].id = i;
        buttons[i].innerHTML = (state[i] !== 0) ? ((state[i] === 1) ? 'X' : 'O') : "";
    }
}

function move() {
    document.getElementById("change").disabled = true;
    render();
    audio.play();
    step++;
    let decision = judge();
    renderResult(decision);
}

function handleClick(event) {
    if (!isGameOver && !isComputerThinking && (state[event.target.id] === 0)) {
        state[event.target.id] = (step % 2 === 0) ? 1 : -1;
        move();

        if (!isGameOver) {
            isComputerThinking = true;
            setTimeout(() => {
                let bestMove = findBestMove();
                state[bestMove] = (step % 2 === 0) ? 1 : -1;
                move();
                isComputerThinking = false;
            }, 500);
        }
    }
}

function renderResult(decision) {
    switch (decision) {
        case result.undecided:
            document.getElementById("game-info").innerHTML = "Next move is " + ((step % 2 === 0) ? 'X' : 'O');
            break;
        case result.draw:
            document.getElementById("game-info").innerHTML = "Draw";
            break;
        case result.xWin:
            document.getElementById("game-info").innerHTML = "X wins!";
            displayWinLine(line, true);
            break;
        case result.oWin:
            document.getElementById("game-info").innerHTML = "O wins!";
            displayWinLine(line, false);
            break;
        default:
    }
}

function judge() {
    for (line of linesToCheck) {
        let sum = sumLine(line);
        if (sum === 3) {
            isGameOver = true;
            return result.xWin;
        } else if (sum === -3) {
            isGameOver = true;
            return result.oWin;
        }
    }

    if (step === 9) {
        isGameOver = true;
        return result.draw;
    } else {
        return result.undecided;
    }
}

function displayWinLine(line, isFirst) {
    let color = isFirst ? 'LightGreen' : 'LightPink';
    for (let dot of line) {
        buttons[dot].style.background = color;
    }
}

function sumLine(line) {
    let sum = 0;
    for (let dot of line) {
        sum += state[dot];
    }

    return sum;
}
