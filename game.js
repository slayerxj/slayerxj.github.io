
let state = Array(9).fill(0);
let step = 0;
let isGameOver = false;

let linesToCheck = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let buttons = document.getElementsByClassName("square");
for (let i = 0; i < buttons.length; i++) {
    buttons[i].id = i;
    buttons[i].addEventListener('click', handleClick);
}

function change() {
    nextBestMove();
    step++;
    render();
    referee();
}

function reset() {
    state = Array(9).fill(0);
    step = 0;
    isGameOver = false;
    render();
    document.getElementById("game-info").innerHTML = "Human first";
}

function render() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].id = i;
        buttons[i].innerHTML = (state[i] !== 0) ? ((state[i] === 1) ? 'X' : 'O') : "";
    }
}

function handleClick(event) {
    if (!isGameOver && (event.target.innerHTML == "")) {
        state[event.target.id] = (step % 2 === 0) ? 1 : -1;
        render();
        step++;
        referee();
        if (step === 9) {
            return;
        }

        nextBestMove();
        step++;
        render();
        referee();
    }
}

function referee() {
    for (line of linesToCheck) {
        let sum = 0;
        for (let dot of line) {
            sum += state[dot];
        }
        if (sum === 3) {
            document.getElementById("game-info").innerHTML = "X wins!";
            isGameOver = true;
            return;
        } else if (sum === -3) {
            document.getElementById("game-info").innerHTML = "O wins!";
            isGameOver = true;
            return;
        }
    }

    if (step !== 9) {
        document.getElementById("game-info").innerHTML = "Next move is " + ((step % 2 === 0) ? 'X' : 'O');
        return;
    } else {
        document.getElementById("game-info").innerHTML = "Draw";
        return;
    }
}

function nextBestMove() {
    let piece = (step % 2 === 0) ? 1 : -1;
    // First Move
    if (step === 0) {
        state[0] = piece;
        return;
    }

    // First Move O
    if (step === 1) {
        if (state[4] === 1) {
            state[0] = piece;
        } else {
            state[4] = piece;
        }
        return;
    }

    // Win
    for (line of linesToCheck) {
        let sum = 0;
        for (let dot of line) {
            sum += state[dot];
        }
        if (sum === 2 * piece) {
            for (let dot of line) {
                if (state[dot] === 0) {
                    state[dot] = piece;
                    return;
                }
            }
        }
    }

    // Block
    for (line of linesToCheck) {
        let sum = 0;
        for (let dot of line) {
            sum += state[dot];
        }
        if (sum === 2 * (-piece)) {
            for (let dot of line) {
                if (state[dot] === 0) {
                    state[dot] = piece;
                    return;
                }
            }
        }
    }

    // Fork
    for (let i = 0; i < state.length; i++) {
        if (state[i] === 0) {
            let hState = [...state];
            hState[i] = piece;
            let candidate = 0;
            for (line of linesToCheck) {
                let sum = 0;
                for (let dot of line) {
                    sum += hState[dot];
                }
                if (sum === 2 * piece) {
                    candidate++;
                    if (candidate === 2) {
                        state[i] = piece;
                        return;
                    }
                }
            }
        }
    }

    // Blocking an opponent's fork

    // Center
    if (state[4] === 0) {
        state[4] = piece;
        return;
    }

    // Opposite corner

    // Empty corner
    let corners = [0, 2, 6, 8];
    for (corner of corners) {
        if (state[corner] === 0) {
            state[corner] = piece;
            return;
        }
    }

    // Empty side
    let sides = [1, 3, 5, 7];
    for (side of sides) {
        if (state[side] === 0) {
            state[side] = piece;
            return;
        }
    }
}