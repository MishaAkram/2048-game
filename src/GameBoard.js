
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

const getRandomPosition=()=>{
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