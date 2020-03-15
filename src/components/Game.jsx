import React, { useState } from "react";
import Board from "./Board";
import { makeInitialBoard } from "../utils/helpers";
import { BOARD_SIZE, WALL, EMPTY, PIECE } from "../utils/constants";
import "../assets/css/game.css";

const Game = () => {
  const initialBoard = makeInitialBoard(BOARD_SIZE);
  const [history, setHistory] = useState([{ squares: initialBoard }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [selectedSquares, setSelectedSquares] = useState([-1, -1]);

  const handleClick = (currentRow, currentCol) => {
    // Copy data points from STATE
    const cpHistory = history.slice(0, stepNumber + 1); // => Array of board history
    const currentBoard = cpHistory[cpHistory.length - 1]; // => Object of current board state { squares: [<board-matrix>]}
    const previousRow = selectedSquares[0];
    const previousCol = selectedSquares[1];
    const hasPreviousSelection = previousRow !== -1 && previousCol !== -1;

    // the slice method does a "shallow copy" of multidemensional array
    const squares = currentBoard.squares.map(arr => {
      return arr.slice(); // => Make shallow copy of array
    });

    if (isGameOver(squares)) {
      return;
    }

    // 1)
    // If the user selects a piece, updates the state
    // of the game with the selected piece and return
    if (squares[currentRow][currentCol] == PIECE) {
      // If the user clicks on the same piece, deselect it.
      if (currentRow === previousRow && currentCol === previousCol) {
        setSelectedSquares([-1, -1]);
      } else {
        setSelectedSquares([currentRow, currentCol]);
      }
    }

    // 2)
    // If the user selects an empty square and has previous selection
    // validates the movement and updates the game state
    if (squares[currentRow][currentCol] === EMPTY && hasPreviousSelection) {
      // Check if the movement is valid
      let isAligned = false;
      let allowedPositions = [
        [previousRow - 2, previousCol], // up
        [previousRow + 2, previousCol], // down
        [previousRow, previousCol - 2], // left
        [previousRow, previousCol + 2] // right
      ];

      for (let position of allowedPositions) {
        let tr = position[0];
        let tc = position[1];
        if (tr === currentRow && tc === currentCol) {
          isAligned = true;
          break;
        }
      }

      let inbetweenRow = currentRow - Math.sign(currentRow - previousRow);
      let inbetweenCol = currentCol - Math.sign(currentCol - previousCol);

      // Check if there is a piece to be "eaten" between the movement
      if (isAligned && squares[inbetweenRow][inbetweenCol] === PIECE) {
        // Update the game state with the new action
        squares[inbetweenRow][inbetweenCol] = EMPTY;
        squares[previousRow][previousCol] = EMPTY;
        squares[currentRow][currentCol] = PIECE;

        setHistory(cpHistory.concat([{ squares: squares }]));
        setStepNumber(cpHistory.length);
        setSelectedSquares([-1, -1]);
      }
    }
  };

  const rewindGame = step => {
    setStepNumber(step);
    setSelectedSquares([-1, -1]);
  };

  const playerMoveHistory = history.map((board, index) => {
    const desc = index ? `Go to move #${index}` : `Go to game start`;
    return (
      <li key={index}>
        <button onClick={() => rewindGame(index)}>{desc}</button>
      </li>
    );
  });

  const isGameOver = squares => {
    let halfBoard = Math.floor(BOARD_SIZE / 2);
    let count = 0;
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        if (squares[row][col] === PIECE) {
          count++;
        }
      }
    }
    return squares[halfBoard][halfBoard] === PIECE && count === 1;
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={history[stepNumber].squares}
          selectedSquares={selectedSquares}
          onClick={(r, c) => handleClick(r, c)}
        />
      </div>
      <div className="game-history">
        <ol>{playerMoveHistory}</ol>
      </div>
    </div>
  );
};

export default Game;
