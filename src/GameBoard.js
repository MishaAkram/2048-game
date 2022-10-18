
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
    
}