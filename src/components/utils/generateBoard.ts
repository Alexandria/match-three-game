import { BoardItem, Board } from "../types";
import { uniqueId, random } from "lodash";

export const emojiItems = ["🍌", "🍑", "🍓", "🥝", "🍒"];
export const boardWidth = 5;

export const generateRandomEmoji = () => {
  const emojiOptions = emojiItems.length - 1;
  return emojiItems[random(emojiOptions)];
};

export const generateRandomBoardItem = (emptyItem?: boolean): BoardItem => {
  return { id: uniqueId(), type: emptyItem ? "" : generateRandomEmoji() };
};

export const generateItems = (size: number): BoardItem[] => {
  const randomItems: BoardItem[] = [];

  for (let i = 0; i < size; i++) {
    const randomEmoji = generateRandomBoardItem();
    randomItems.push(randomEmoji);
  }

  return randomItems;
};

export const generateBoard = (size: number): Board => {
  const board: Board = [];
  for (let i = 0; i < size; i++) {
    board.push(generateItems(5));
  }

  return board;
};
