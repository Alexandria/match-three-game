import { forEach } from "lodash";
import { Board, BoardItem } from "../types";
import { checkForMatchesV2 } from "./checkForMatches";

const removeById = (itemsToRemove: string[]) => (item: BoardItem) => {
  if (itemsToRemove.includes(item.id)) {
    item.type = "";
  }
};

export const removeRowMatches = (
  board: Board,
  setScore: (newScore: number) => void
) => {
  let matchRemoved = false;
  const boardToCheck = board.slice(1);
  forEach(boardToCheck, (row, rowIndex) => {
    const rowMatchesFound = checkForMatchesV2(row);
    if (rowMatchesFound) {
      forEach(row, removeById(rowMatchesFound));
      matchRemoved = true;
    }
  });

  return matchRemoved;
};

export const removeColumnMatches = (
  board: Board,
  setScore: (newScore: number) => void
) => {
  let matchRemoved = false;
  const boardToCheck = board.slice(1);
  forEach(boardToCheck, (row, rowIndex) => {
    const column: BoardItem[] = [];

    forEach(row, (value, colIndex) => {
      const col = boardToCheck[colIndex][rowIndex];
      column.push(col);
    });
    const colMatchesFound = checkForMatchesV2(column);

    if (colMatchesFound) {
      forEach(column, removeById(colMatchesFound));
      matchRemoved = true;
    }
  });

  return matchRemoved;
};
