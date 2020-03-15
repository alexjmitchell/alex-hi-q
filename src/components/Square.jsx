import React from "react";
import "../assets/css/square.css";

const Square = props => {
  const selected = props.selectedRow && props.selectedColumn ? "selected" : "";
  const classes = `square ${props.square} ${selected}`;
  return <button className={classes} onClick={props.onClick}></button>;
};

export default Square;
