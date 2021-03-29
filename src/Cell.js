import React from "react";
import "./Cell.css";


function Cell({ flipcellsAroundMe, isLit=false }) {
  const classes = `Cell ${isLit ? "Cell-lit" : ""}`;
  return <td className={classes} onClick={flipcellsAroundMe} role="button" />;
}

export default Cell;
