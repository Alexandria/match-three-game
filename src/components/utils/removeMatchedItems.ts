import { forEach } from "lodash";
import { Board, BoardItem } from "../types";
import { checkForMatchesV2 } from "./checkForMatches";

export const removeMatchedItems = (
  board: Board,
  setScore: (newScore: number) => void
) => {
  forEach(board, (row, rowIndex) => {
    const column: BoardItem[] = [];
    checkForMatchesV2(row);
    forEach(row, (value, colIndex) => {
      if (!board[colIndex][rowIndex]) return;
      const col = board[colIndex][rowIndex];
      column.push(col);
    });
    checkForMatchesV2(column);
  });
};
