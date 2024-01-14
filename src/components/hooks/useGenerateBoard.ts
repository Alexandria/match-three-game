import React from "react";
import { BoardItem, Board, BoardRow } from "../types";
import { uniqueId, random } from "lodash";

const emojiItems = ["🍌", "🍑", "🍓", "🥝", "🍒"];
const boardWidth = 5;

const generateRandomBoardItem = (): BoardItem => {
  const randomEmoji = emojiItems[random(boardWidth - 1)];
  return { id: uniqueId(), type: randomEmoji };
};

const generateRow = (): BoardRow => {
  const randomItems: BoardItem[] = [];

  for (let i = 0; i < boardWidth; i++) {
    const randomEmoji = generateRandomBoardItem();
    randomItems.push(randomEmoji);
  }

  return { id: uniqueId(), items: generateItems() };
};

const generateItems = (): BoardItem[] => {
  const randomItems: BoardItem[] = [];

  for (let i = 0; i < boardWidth; i++) {
    const randomEmoji = generateRandomBoardItem();
    randomItems.push(randomEmoji);
  }

  return randomItems;
};

export const useGenerateBoard = (): Board => {
  const board: Board = [];
  for (let i = 0; i < boardWidth; i++) {
    const row = { id: String(i), items: generateItems() };
    board.push(row);
  }

  return board;
};
