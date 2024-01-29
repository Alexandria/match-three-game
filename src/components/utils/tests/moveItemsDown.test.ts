import { mockEmptyBoard } from "../../fixtures";
import { moveItemsDown } from "../moveItemsDown";

describe("moveItemsDown", () => {
  it("will move item down if there is an empty space below", () => {
    const board = moveItemsDown(mockEmptyBoard);

    // expect(board).toBe();
  });
  it.todo("will not move item down if there is no empty space below it");
});
