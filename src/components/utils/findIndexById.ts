import { Board } from "../types";

export const findIndexById = (id: string, board: Board) => {
  let colIndex: number = -1;
  let rowIndex: number = -1;
  board.forEach((row, index) => {
    const col = Object.values(row).findIndex((item) => {
      return item.id === id;
    });

    if (col !== -1) {
      colIndex = col;
      rowIndex = index;
    }
  });

  return { col: colIndex, row: rowIndex };
};
