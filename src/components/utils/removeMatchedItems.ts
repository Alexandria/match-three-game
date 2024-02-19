import { some, forEach, times } from "lodash";
import { Board, BoardItem } from "../types";
import { checkForMatchesV2 } from "./checkForMatches";

const removeById = (itemsToRemove: string[]) => (item: BoardItem) => {
  if (itemsToRemove.includes(item.id)) {
    item.type = "";
  }
};

export const removeMatchesFromBoard = (
  board: Board,
  setScore: (newScore: number) => void
) => {
  const boardToCheck = board.slice(1);
  forEach(boardToCheck, (row, rowIndex) => {
    const rowMatchesFound = checkForMatchesV2(row);
    if (rowMatchesFound) {
      forEach(row, removeById(rowMatchesFound));
    }
  });
};

export const removeColumnMatches = (
  board: Board,
  setScore: (newScore: number) => void
) => {
  const boardToCheck = board.slice(1);
  forEach(boardToCheck, (row, rowIndex) => {
    const column: BoardItem[] = [];
    console.log("column", column);
    forEach(row, (value, colIndex) => {
      const col = boardToCheck[colIndex][rowIndex];
      column.push(col);
    });
    const colMatchesFound = checkForMatchesV2(column);

    if (colMatchesFound) {
      console.log("colMatchesFound", colMatchesFound);
      forEach(column, removeById(colMatchesFound));
    }
  });
};
