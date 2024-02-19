import { updateRowInMockBoard } from "../../fixtures";
import { BoardRow } from "../../types";
import { checkForMatchesV2 } from "../checkForMatches";

describe("checkForMatchesV2", () => {
  describe("when checking for a match of 5", () => {
    const row5: BoardRow = [
      { id: "1", type: "🍓" },
      { id: "2", type: "🍓" },
      { id: "3", type: "🍓" },
      { id: "4", type: "🍓" },
      { id: "5", type: "🍓" },
    ];
    it("will return the ids of all matching items if there is a match of 5", () => {
      const matchingIds = checkForMatchesV2(row5);
      expect(matchingIds).toEqual(
        expect.arrayContaining(["1", "2", "3", "4", "5"])
      );
      expect(matchingIds).toHaveLength(5);
    });
  });
  describe("when checking for a match of 4", () => {
    const row4: BoardRow = [
      { id: "1", type: "🍓" },
      { id: "2", type: "🍓" },
      { id: "3", type: "🍓" },
      { id: "4", type: "🍓" },
      { id: "5", type: "🍌" },
    ];
    it("will return the ids of all matching items if the match started at index 0", () => {
      const matchingIds = checkForMatchesV2(row4);
      expect(matchingIds).toEqual(expect.arrayContaining(["1", "2", "3", "4"]));
      expect(matchingIds).toHaveLength(4);
    });

    it("will return the ids of all matching items if the match started at index 1", () => {
      const newRow = [...row4];
      newRow.splice(0, 1, { id: "1", type: "🍌" });
      newRow.splice(4, 1, { id: "5", type: "🍓" });
      const matchingIds = checkForMatchesV2(newRow);
      expect(matchingIds).toEqual(expect.arrayContaining(["2", "3", "4", "5"]));
      expect(matchingIds).toHaveLength(4);
    });
  });
  describe("when checking for a match of 3", () => {
    const row3: BoardRow = [
      { id: "1", type: "🍓" },
      { id: "2", type: "🍓" },
      { id: "3", type: "🍓" },
      { id: "4", type: "🍑" },
      { id: "5", type: "🍌" },
    ];
    it("will return the ids of all matching items if the match started at 0", () => {
      const matchingIds = checkForMatchesV2(row3);
      expect(matchingIds).toEqual(expect.arrayContaining(["1", "2", "3"]));
      expect(matchingIds).toHaveLength(3);
    });

    it("will return the ids of all matching items if the match started at 1", () => {
      const newRow = [...row3];
      newRow.unshift({ id: "5", type: "🍌" });
      newRow.pop();
      const matchingIds = checkForMatchesV2(newRow);
      expect(matchingIds).toEqual(expect.arrayContaining(["1", "2", "3"]));
      expect(matchingIds).toHaveLength(3);
    });

    it("will return the ids of all matching items if the match started at 2", () => {
      const newRow = [...row3];
      newRow.unshift({ id: "5", type: "🍌" }, { id: "4", type: "🍑" });
      newRow.pop();
      newRow.pop();
      const matchingIds = checkForMatchesV2(newRow);
      expect(matchingIds).toEqual(expect.arrayContaining(["1", "2", "3"]));
      expect(matchingIds).toHaveLength(3);
    });
  });
  describe("when there is no matches", () => {
    const row = [
      { id: "6", type: "🍌" },
      { id: "7", type: "🍒" },
      { id: "8", type: "🍌" },
      { id: "9", type: "🍌" },
      { id: "10", type: "🍑" },
    ];
    it("will return undefined", () => {
      const matchingIds = checkForMatchesV2(row);
      expect(matchingIds).toEqual(undefined);
    });
  });
});
