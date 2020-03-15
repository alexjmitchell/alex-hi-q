import React from "react";
import Game from "./Game";
import Marquee from "./Marquee";
import "../assets/css/app.css";

const App = () => {
  return (
    <div className="App">
      <Marquee />
      <Game />
    </div>
  );
};

export default App;
