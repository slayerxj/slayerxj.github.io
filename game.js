let state = Array(9).fill(0);
let step = 0;
let isGameOver = false;
let isComputerThinking = false;
const audio = new Audio("ca.mp3");
var result = { undecided: -1, draw: 0, xWin: 1, oWin: 2 };

function handleClick(event) {
    if (isGameOver) {
        restart();
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
    // document.getElementById("change").disabled = true;
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
}

// function change() {
//     state[findBestMove(state)] = 1;
//     document.getElementById("change").disabled = true;
//     step++;
//     render();
//     judge(state);
// }

// function reset() {
//     state = Array(9).fill(0);
//     step = 0;
//     isGameOver = false;
//     render();
//     document.getElementById("game-info").innerHTML = "Human first";
//     document.getElementById("change").disabled = false;
//     for (let i = 0; i < buttons.length; i++) {
//         buttons[i].style.background = "";
//     }
// }

// function render() {
//     for (let i = 0; i < buttons.length; i++) {
//         buttons[i].id = i;
//         buttons[i].innerHTML = (state[i] !== 0) ? ((state[i] === 1) ? 'X' : 'O') : "";
//     }
// }

// function move() {
//     document.getElementById("change").disabled = true;
//     render();
//     audio.play();
//     step++;
//     let decision = judge(state);
//     renderResult(decision);
// }

// function handleClick(event) {
//     if (!isGameOver && !isComputerThinking && (state[event.target.id] === 0)) {
//         state[event.target.id] = (step % 2 === 0) ? 1 : -1;
//         move();

//         if (!isGameOver) {
//             isComputerThinking = true;
//             setTimeout(() => {
//                 let bestMove = findBestMove(state);
//                 state[bestMove] = (step % 2 === 0) ? 1 : -1;
//                 move();
//                 isComputerThinking = false;
//             }, 500);
//         }
//     }
// }

function renderResult(decision) {
    switch (decision) {
        case result.undecided:
            // document.getElementById("game-info").innerHTML = "Next move is " + ((step % 2 === 0) ? 'X' : 'O');
            break;
        case result.draw:
            isGameOver = true;
            // document.getElementById("game-info").innerHTML = "Draw";
            break;
        case result.xWin:
            isGameOver = true;
            // document.getElementById("game-info").innerHTML = "X wins!";
            // displayWinLine(line, true);
            break;
        case result.oWin:
            isGameOver = true;
            // document.getElementById("game-info").innerHTML = "O wins!";
            // displayWinLine(line, false);
            break;
        default:
    }
}
