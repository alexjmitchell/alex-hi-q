import React from "react";
import Board from "./Board";
import "../assets/css/game.css";

const Game = () => {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
};

export default Game;
