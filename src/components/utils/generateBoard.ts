import React from "react";
import { BoardItem, Board } from "../types";
import { uniqueId, random } from "lodash";

export const emojiItems = ["🍌", "🍑", "🍓", "🥝", "🍒"];
export const boardWidth = 5;

export const generateRandomBoardItem = (): BoardItem => {
  const randomEmoji = emojiItems[random(boardWidth - 1)];
  return { id: uniqueId(), type: randomEmoji };
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
