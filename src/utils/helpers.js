import { WALL, EMPTY, PIECE } from "./constants"

export const initialBoard = [
  ['wall', 'wall', 'piece', 'piece', 'piece', 'wall', 'wall'],
  ['wall', 'wall', 'piece', 'piece', 'piece', 'wall', 'wall'],
  ['piece', 'piece', 'piece', 'piece', 'piece', 'piece', 'piece'],
  ['piece', 'piece', 'piece', 'empty', 'piece', 'piece', 'piece'],
  ['piece', 'piece', 'piece', 'piece', 'piece', 'piece', 'piece'],
  ['wall', 'wall', 'piece', 'piece', 'piece', 'wall', 'wall'],
  ['wall', 'wall', 'piece', 'piece', 'piece', 'wall', 'wall'],
]

export const makeInitialBoard = (size) => {
  let board = []
  for (let rowIndex = 0; rowIndex < size; rowIndex++) {
    let row = []
    for (let columnIndex = 0; columnIndex < size; columnIndex++) {
      let value = WALL
      let halfBoard = Math.floor(size / 2)        // => 3
      let halfRemaining = (size - halfBoard) / 2  // => 2

      const horiStart = halfRemaining
      const vertStart = halfRemaining
      const horiEnd = (size - halfRemaining)
      const vertEnd = (size - halfRemaining) // P.E.M.D.A.S - YO!

      //  Looking for center of the board
      if (rowIndex === columnIndex && rowIndex === halfBoard) {
        value = EMPTY
      // Determine where to place pieces
      } else if (
        rowIndex >= horiStart &&      // check if we are equal to or after the start of horizontal cross
        rowIndex < horiEnd ||         // check if we are before the end of horizontal cross
        columnIndex >= vertStart &&   // check if we are equal to or after the start of vertical cross
        columnIndex < vertEnd         // check if we are before the end of vertical cross
      ) {
        value = PIECE
      }
      // Push into the row
      row.push(value)
    }
    // Push row into the board
    board.push(row)
  }
  return board
}