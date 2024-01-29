import { forEach } from "lodash";
import { Board } from "../types";

export const moveItemsDown = (board: Board): Board => {
  const boardLength = board.length - 1;
  forEach(board, (row, rowIndex) => {
    forEach(row, (item, colIndex) => {
      if (rowIndex >= boardLength) return;
      if (rowIndex === 0 && item.type === "") {
        const itemBelow = board[rowIndex + 1][colIndex];
        const currentItem = board[rowIndex][colIndex];
        board[rowIndex][colIndex] = itemBelow;
        board[rowIndex + 1][colIndex] = currentItem;
      }
      if (item.type === "" && rowIndex > 0) {
        // this section may need to swap slower perhaps wrap in a function
        const itemAbove = board[rowIndex - 1][colIndex];
        const currentItem = board[rowIndex][colIndex];
        board[rowIndex][colIndex] = itemAbove;
        board[rowIndex - 1][colIndex] = currentItem;
      }
    });
  });

  if (
    board[1].some((row, index) => row.type === "") &&
    board[0].every((row, index) => row.type !== "")
  ) {
    return moveItemsDown(board);
  }
  return board;
};
