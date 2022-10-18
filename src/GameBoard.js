
// code to develop the 2048 board
export const getEmptyBoard = () => [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
]

const hasValue = (board, value) => {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === value) {
                return true;
            }
        }
    }
    return false;
}

export const isFull = (board) => {
    return !hasValue(board, 0);
}

const getRandomPosition = () => {
    const rowPosition = Math.floor(Math.random() * 4);
    const colPosition = Math.floor(Math.random() * 4);
    return [rowPosition, colPosition];
}

export const generateRandom = (board) => {
    if (isFull(board)) {
        return board;
    }
    let [rowPosition, colPosition] = getRandomPosition();
    while (board[rowPosition][colPosition] !== 0) {
        [rowPosition, colPosition] = getRandomPosition();
    }
    board[rowPosition][colPosition] = 2;
    return board;
}

const compress = (board) => {
    const newBoard = getEmptyBoard();
    for (let i = 0; i < board.length; i++) {
        let count = 0;
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] !== 0) {
                newBoard[i][count] = board[i][j];
                count++;
            }
        }
    }
    return newBoard;
};

const merge = (board) => {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length - 1; j++) {
            if (board[i][j] === board[i][j + 1] && board[i][j] !== 0) {
                board[i][j] = board[i][j] * 2;
                board[i][j + 1] = 0;
            }
        }
    }
    return board;
};

export const moveLeft = (board) => {
    const newBoard1 = compress(board);
    const newBoard2 = merge(newBoard1);
    return compress(newBoard2);
}

const reverse = (board) => {
    const newBoard = getEmptyBoard();
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            newBoard[i][j] = board[i][board[i].length - 1 - j];
        }
    }
    return newBoard;
}

export const moveRight = (board) => {
    const reversedBoard = reverse(board);
    const newBoard1 = compress(reversedBoard);
    return reverse(newBoard1);    
};

const rotateLeft = (board) => {
    const newBoard = getEmptyBoard();
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            newBoard[i][j] = board[j][i];
        }
    }
    return newBoard;
}

const rotateRight = (board) => {
    const newBoard = getEmptyBoard();
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            newBoard[i][j] = board[board.length - 1 - j][i];
        }
    }
    return newBoard;
}




export const moveUp = (board) => {
    const rotatedLeftBoard = rotateLeft(board);
    const newBoard1 = compress(rotatedLeftBoard);
    return rotateRight(newBoard1);
}

export const moveDown = (board) => {
    const rotatedRightBoard = rotateRight(board);
    const newBoard1 = compress(rotatedRightBoard);
    return rotateLeft(newBoard1);
}

export const checkWin = (board) => {
    return hasValue(board, 2048);
}

const hasDiff = (board1, board2) => {
    for (let i = 0; i < board1.length; i++) {
        for (let j = 0; j < board1[i].length; j++) {
            if (board1[i][j] !== board2[i][j]) {
                return true;
            }
        }
    }
    return false;
}

export const isOver = (board) => {
    if (hasDiff(board, moveLeft(board))) {
        return false;
    }
    if (hasDiff(board, moveRight(board))) {
        return false;
    }
    if (hasDiff(board, moveUp(board))) {
        return false;
    }
    if (hasDiff(board, moveDown(board))) {
        return false;
    }
    return true;
}

