import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *  This doesn't handle any clicks --- clicks are on individual cells
 **/

function Board({ nrows, ncols, chanceLightStartsOn = 0.5 }) {
  const [board, setBoard] = useState(createBoard());


  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for(let y=0; y<nrows; y++){
      let row = [];
      for(let x=0; x<ncols; x++){
        row.push(Math.random() < chanceLightStartsOn);
      }
      initialBoard.push(row);
    }
    return initialBoard;
  }


 // check the board in state to determine whether the player has won.
 function hasWon() {
  return board.every(row => row.every(cell => !cell));
}


function flipCellsAround(coord) {
  setBoard(oldBoard => {
    const [y,x] = coord.split("-").map(Number);

    const flipCell = (y, x, boardCopy) => {

      if(x >= 0 && x < ncols && y >= 0 && y < nrows) {
        boardCopy[y][x] = !boardCopy[y][x];
      }
    };
    
    const boardCopy = oldBoard.map(row => [...row]);

    flipCell(y, x, boardCopy);
    flipCell(y, x-1, boardCopy);
    flipCell(y, x+1, boardCopy);
    flipCell(y-1, x, boardCopy);
    flipCell(y+1, x, boardCopy);

    return boardCopy;
  });
}



if(hasWon()) {
  return <div>You win!</div>;
}

// create table with cells and coordinates

let tblBoard = [];

for(let y=0; y < ncols; y++){
  let row = [];
  for(let x=0; x < nrows; x++){
    let coord = `${y}-${x}`
    row.push(
      <Cell
      key={coord}
      isLit={board[y][x]}
      flipCellsAroundMe={() => flipCellsAround(coord)}
      />
    );
  }
  tblBoard.push(<tr key={y}> {row} </tr>);
}


return(
  <table>
  <tbody>{tblBoard}</tbody>
  </table>
)


}

export default Board;
