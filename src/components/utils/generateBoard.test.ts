import * as React from "react";
import { render, screen } from "@testing-library/react";
import {
  boardWidth,
  emojiItems,
  generateItems,
  generateRandomBoardItem,
  generateBoard,
} from "./generateBoard";

describe("useGenerateBoard", () => {
  it("will create a board that is boardWidth by boardWith", () => {
    const randomBoard = generateBoard();
    expect(randomBoard).toHaveLength(boardWidth);
    randomBoard.forEach((row) => expect(row).toHaveLength(boardWidth));
  });
});

describe("generateItems", () => {
  it("will generate an array of items at length of boardWidth", () => {
    const newRow = generateItems();
    expect(newRow).toHaveLength(boardWidth);
  });
});

describe("generateRandomBoardItem", () => {
  it("will generate a random board item out of the emojiItems array", () => {
    const newItem = generateRandomBoardItem();
    const item = emojiItems.find((item) => item === newItem.type);
    expect(item).toBeTruthy();
  });
});
