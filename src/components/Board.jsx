import React from "react";
import Square from "./Square";
import { BOARD_SIZE } from "../utils/constants";
import "../assets/css/board.css";

const Board = props => {
  let board_indexes = Array(BOARD_SIZE);
  for (let i = 0; i < BOARD_SIZE; i++) {
    board_indexes[i] = i;
  }

  return (
    <div className="board">
      {board_indexes.map(row => {
        return (
          <div key={row} className="board-row">
            {board_indexes.map(col => {
              return (
                <Square
                  key={row * BOARD_SIZE + col}
                  square={props.squares[row][col]}
                  selectedRow={row === props.selectedSquares[0]}
                  selectedColumn={col === props.selectedSquares[1]}
                  onClick={(r, c) => {
                    props.onClick(row, col);
                  }}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
