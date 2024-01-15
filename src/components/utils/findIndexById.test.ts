import { mockBoard } from "../fixtures";
import { findIndexById } from "./findIndexById";

describe("findIndexById", () => {
  it("will return the index of an item by id", () => {
    const itemId = findIndexById("8", mockBoard);
    expect(itemId).toEqual({ col: 2, row: 1 });
  });
});
