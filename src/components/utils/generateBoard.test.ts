import {
  emojiItems,
  generateItems,
  generateRandomBoardItem,
  generateBoard,
} from "./generateBoard";

const boardWidth = 3;

describe("useGenerateBoard", () => {
  it("will create a board that is boardWidth by boardWith", () => {
    const randomBoard = generateBoard(boardWidth);
    expect(randomBoard).toHaveLength(boardWidth);
    randomBoard.forEach((row) => expect(row).toHaveLength(boardWidth));
  });
});

describe("generateItems", () => {
  it("will generate an array of items at length of boardWidth", () => {
    const newRow = generateItems(boardWidth);
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
