import React, { useEffect, useState } from "react";
import { getEmptyBoard, generateRandom, moveLeft, moveRight, moveUp, moveDown, isOver, checkWin } from "./GameBoard";

const Cell = ({ number }) => {
    return (
        <div className={`cell cell-${number}`}>{number > 0 ? number : ""}</div>
    );
};

const GameController = () => {
    const [board, updateBoard] = useState(generateRandom(getEmptyBoard()));

    const checkEndGame = () => {
        if (checkWin(board)) {
            console.log("You win!");
        } else if (isOver(board)) {
            console.log("Game over!");
        }
    };

    const left = () => {
        const newBoard = moveLeft(board);
        updateBoard(generateRandom(newBoard));
        checkEndGame();
    };

    const right = () => {
        const newBoard = moveRight(board);
        updateBoard(generateRandom(newBoard));
        checkEndGame();
    };

    const up = () => {
        const newBoard = moveUp(board);
        updateBoard(generateRandom(newBoard));
        checkEndGame();
    };

    const down = () => {
        const newBoard = moveDown(board);
        updateBoard(generateRandom(newBoard));
        checkEndGame();
    };

    const onKeyDown = (e) => {
        switch (e.key) {
            case "ArrowLeft":
                left();
                break;
            case "ArrowRight":
                right();
                break;
            case "ArrowUp":
                up();
                break;
            case "ArrowDown":
                down();
                break;

            default:
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", onKeyDown);

        return () => {
            window.removeEventListener("keydown", onKeyDown);
        };
    });

    return (
        <>
            <div className="game-board">
                {board.map((row, i) => {
                    return (
                        <div key={`row-${i}`} className="row">
                            {row.map((cell, j) => (
                                <Cell key={`cell-${i}-${j}`} number={cell} />
                            ))}
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default GameController;
