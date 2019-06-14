let isNextClickX = true;
let state = Array(9).fill(0);

let buttons = document.getElementsByClassName("square");
for (let i = 0; i < buttons.length; i++) {
    buttons[i].id = i;
    buttons[i].addEventListener('click', handleClick);
}

function handleClick(event) {
    if (event.target.innerHTML == "") {
        state[event.target.id] = isNextClickX ? 1 : -1;
        event.target.innerHTML = isNextClickX ? 'X' : 'O';
        isNextClickX = !isNextClickX;

        let result = referee();
        if (result === 1) {
            document.getElementById("game-info").innerHTML = "X wins!";
        } else if (result === -1) {
            document.getElementById("game-info").innerHTML = "O wins!";
        } else if (result === 0) {
            document.getElementById("game-info").innerHTML = "Next move is " + (isNextClickX ? 'X': 'O');
        } else {
            document.getElementById("game-info").innerHTML = "Fair";
        }
    }
}

function referee() {
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
    for (line of linesToCheck) {
        let sum = 0;
        for (let dot of line) {
            sum += state[dot];
        }
        if (sum === 3) {
            return 1;
        } else if (sum === -3) {
            return -1;
        }
    }

    if (state.some(value => { return (value === 0); })) {
        return 0;
    } else {
        return 2;
    }

}