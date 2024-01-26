import { BoardItem, Board } from "../types";
import { uniqueId, random } from "lodash";

export const emojiItems = ["🍌", "🍑", "🍓", "🥝", "🍒"];
export const boardWidth = 5;

export const generateRandomEmoji = () => {
  return emojiItems[random(boardWidth - 1)];
};

export const generateRandomBoardItem = (emptyItem?: boolean): BoardItem => {
  return { id: uniqueId(), type: emptyItem ? "" : generateRandomEmoji() };
};

export const generateItems = (): BoardItem[] => {
  const randomItems: BoardItem[] = [];

  for (let i = 0; i < boardWidth; i++) {
    const randomEmoji = generateRandomBoardItem();
    randomItems.push(randomEmoji);
  }

  return randomItems;
};

export const generateBoard = (): Board => {
  const board: Board = [];
  for (let i = 0; i < boardWidth; i++) {
    board.push(generateItems());
  }

  return board;
};
