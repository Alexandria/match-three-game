import { forEach, every } from "lodash";
import { Board } from "../types";
import { generateRandomEmoji } from "./generateBoard";

export const moveItemsDown = (board: Board): Board => {
  forEach(board, (row, rowIndex) => {
    forEach(row, (item, colIndex) => {
      if (rowIndex > 5) return;
      if (rowIndex === 0 && item.type === "") {
        item.type = generateRandomEmoji();
        const itemBelow = board[rowIndex + 1][colIndex];
        const currentItem = board[rowIndex][colIndex];
        board[rowIndex][colIndex] = itemBelow;
        board[rowIndex + 1][colIndex] = currentItem;
        board[rowIndex + 1][colIndex].animate = true;
      }
      if (item.type === "" && rowIndex > 0) {
        // this section may need to swap slower perhaps wrap in a function
        if (rowIndex > 1) {
          board[rowIndex - 2][colIndex].delay = 0.8;
        }
        const itemAbove = board[rowIndex - 1][colIndex];
        const currentItem = board[rowIndex][colIndex];
        board[rowIndex][colIndex] = itemAbove;
        board[rowIndex - 1][colIndex] = currentItem;
        board[rowIndex][colIndex].animate = true;
      }
    });
  });

  const isEverySpotFilled = every(board, (row) => {
    return every(row, (item) => item.type !== "");
  });

  if (!isEverySpotFilled) {
    return moveItemsDown(board);
  }
  return board;
};
