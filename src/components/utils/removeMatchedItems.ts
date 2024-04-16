import { Board, BoardItem } from "../types";
import { checkForMatchesV2 } from "./checkForMatches";

export const removeMatchedItems = (
  board: Board,
  setScore: (newScore: number) => void
) => {
  for (let i = 0; i < 6; i++) {
    const column: BoardItem[] = [];

    checkForMatchesV2(board[i]);
    for (let x = 0; x < 6; x++) {
      if (!board[x][i]) return;
      const col = board[x][i];
      column.push(col);
    }
    checkForMatchesV2(column);
  }
};
