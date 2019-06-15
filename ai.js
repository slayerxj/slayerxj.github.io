function findBestMove() {

    let piece = (step % 2 === 0) ? 1 : -1;

    // First Move
    if (step === 0) {
        return 0;
    }

    // First Move O
    if (step === 1) {
        if (state[4] === 1) {
            return 0;
        } else {
            return 4;
        }
    }

    // Win
    for (line of linesToCheck) {
        let sum = sumLine(line);
        if (sum === 2 * piece) {
            for (let dot of line) {
                if (state[dot] === 0) {
                    return dot;
                }
            }
        }
    }

    // Block
    for (line of linesToCheck) {
        let sum = sumLine(line);
        if (sum === 2 * (-piece)) {
            for (let dot of line) {
                if (state[dot] === 0) {
                    return dot;
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
                        return i;
                    }
                }
            }
        }
    }

    // Blocking an opponent's fork

    // Center
    if (state[4] === 0) {
        return 4;
    }

    // Opposite corner

    // Empty corner
    let corners = [0, 2, 6, 8];
    for (corner of corners) {
        if (state[corner] === 0) {
            return corner;
        }
    }

    // Empty side
    let sides = [1, 3, 5, 7];
    for (side of sides) {
        if (state[side] === 0) {
            return side;
        }
    }
}
