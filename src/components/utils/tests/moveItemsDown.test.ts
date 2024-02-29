import { mockBoard, mockEmptyBoard } from "../../fixtures";
import { Board, BoardRow } from "../../types";
import { moveItemsDown } from "../moveItemsDown";

const updateRowInBoard = (
  board: Board,
  indexToReplace: number,
  replacementRow: BoardRow
) => {
  const newBoard = [...board];
  newBoard.splice(indexToReplace, 1, replacementRow);
  return newBoard;
};
describe("moveItemsDown", () => {
  it("will move items down if there is an empty space below", () => {
    const board = moveItemsDown(mockEmptyBoard);

    expect(board[2]).toStrictEqual(
      expect.arrayContaining([
        { id: "11", type: "🍑" },
        { id: "12", type: "🍑" },
        { id: "8", animate: true, type: "🍌" },
        { id: "9", animate: true, type: "🍌" },
        { id: "10", animate: true, type: "🍑" },
      ])
    );
  });
  it("will not move item down if there is no empty space below it", () => {
    const board = moveItemsDown(mockEmptyBoard);

    expect(board[3]).toStrictEqual(
      expect.arrayContaining([
        { id: "16", type: "🥝" },
        { id: "17", type: "🍌" },
        { id: "18", type: "🥝" },
        { id: "19", type: "🍒" },
        { id: "20", type: "🥝" },
      ])
    );
  });
  it("will move item down if bottom row has an empty space", () => {
    const rowToReplace = [
      { id: "100", type: "🍑" },
      { id: "101", type: "🥝" },
      { id: "102", type: "" },
      { id: "103", type: "" },
      { id: "104", type: "" },
    ];

    const bottomRowHasEmptySpot = updateRowInBoard(mockBoard, 5, rowToReplace);
    const board = moveItemsDown(bottomRowHasEmptySpot);

    expect(board[5]).toStrictEqual(
      expect.arrayContaining([
        { id: "100", type: "🍑" },
        { id: "101", type: "🥝" },
        { id: "23", animate: true, type: "🍒" },
        { id: "24", animate: true, type: "🍑" },
        { id: "25", animate: true, type: "🥝" },
      ])
    );
  });
});
