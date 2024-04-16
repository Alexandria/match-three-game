import { every, forEach } from "lodash";
import { BoardRow } from "../../types";
import { checkForMatchesV2 } from "../checkForMatches";

describe("checkForMatchesV2 rows", () => {
  describe("when checking for a match of 5", () => {
    const row5: BoardRow = [
      { id: "1", type: "🍓" },
      { id: "2", type: "🍓" },
      { id: "3", type: "🍓" },
      { id: "4", type: "🍓" },
      { id: "5", type: "🍓" },
    ];
    it("will remove the types of all matching items if there is a match of 5", () => {
      checkForMatchesV2(row5);
      expect(every(row5, (item) => item.type === "")).toBeTruthy();
    });
  });
  describe("when checking for a match of 4", () => {
    it("will remove the types of all matching items if the match started at index 0", () => {
      const row: BoardRow = [
        { id: "1", type: "🍓" },
        { id: "2", type: "🍓" },
        { id: "3", type: "🍓" },
        { id: "4", type: "🍓" },
        { id: "5", type: "🍌" },
      ];
      checkForMatchesV2(row);
      forEach(row, (item, index) => {
        if (index === 4) return;
        expect(item.type).toEqual("");
      });
      expect(row[4].type).toEqual("🍌");
    });

    it("will remove the types of all matching items if the match started at index 1", () => {
      const row: BoardRow = [
        { id: "1", type: "🍌" },
        { id: "2", type: "🍓" },
        { id: "3", type: "🍓" },
        { id: "4", type: "🍓" },
        { id: "5", type: "🍓" },
      ];
      checkForMatchesV2(row);
      forEach(row, (item, index) => {
        if (index === 0) return;
        expect(item.type).toEqual("");
      });
      expect(row[0].type).toEqual("🍌");
    });
  });
  describe("when checking for a match of 3", () => {
    it("will remove the types of all matching items if the match started at 0", () => {
      const row: BoardRow = [
        { id: "1", type: "🍓" },
        { id: "2", type: "🍓" },
        { id: "3", type: "🍓" },
        { id: "4", type: "🍑" },
        { id: "5", type: "🍌" },
      ];
      checkForMatchesV2(row);
      forEach(row, (item, index) => {
        if (index === 3 || index === 4) return;
        expect(item.type).toEqual("");
      });
      expect(row[3].type).toEqual("🍑");
      expect(row[4].type).toEqual("🍌");
    });

    it("will remove the types of all matching items if the match started at 1", () => {
      const row: BoardRow = [
        { id: "5", type: "🍌" },
        { id: "1", type: "🍓" },
        { id: "2", type: "🍓" },
        { id: "3", type: "🍓" },
        { id: "4", type: "🍑" },
      ];

      checkForMatchesV2(row);
      forEach(row, (item, index) => {
        if (index === 0 || index === 4) return;
        expect(item.type).toEqual("");
      });
      expect(row[4].type).toEqual("🍑");
      expect(row[0].type).toEqual("🍌");
    });

    it("will remove the types of all matching items if the match started at 2", () => {
      const row: BoardRow = [
        { id: "4", type: "🍑" },
        { id: "5", type: "🍌" },
        { id: "1", type: "🍓" },
        { id: "2", type: "🍓" },
        { id: "3", type: "🍓" },
      ];

      checkForMatchesV2(row);
      forEach(row, (item, index) => {
        if (index === 0 || index === 1) return;
        expect(item.type).toEqual("");
      });
      expect(row[0].type).toEqual("🍑");
      expect(row[1].type).toEqual("🍌");
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
    it("will not change the row at all", () => {
      checkForMatchesV2(row);
      expect(row).toEqual(
        expect.arrayContaining([
          { id: "6", type: "🍌" },
          { id: "7", type: "🍒" },
          { id: "8", type: "🍌" },
          { id: "9", type: "🍌" },
          { id: "10", type: "🍑" },
        ])
      );
    });
  });
});

describe("checkForMatchesV2 col", () => {
  describe("when checking for a match of 6", () => {
    const row5: BoardRow = [
      { id: "1", type: "🍓" },
      { id: "2", type: "🍓" },
      { id: "3", type: "🍓" },
      { id: "4", type: "🍓" },
      { id: "5", type: "🍓" },
      { id: "5", type: "🍓" },
    ];
    it("will remove the types of all matching items if there is a match of 5", () => {
      checkForMatchesV2(row5);
      expect(every(row5, (item) => item.type === "")).toBeTruthy();
    });
  });

  describe("when checking for a match of 5", () => {
    it("will remove the types of all matching items if the match started at index 0", () => {
      const row: BoardRow = [
        { id: "1", type: "🍓" },
        { id: "2", type: "🍓" },
        { id: "3", type: "🍓" },
        { id: "4", type: "🍓" },
        { id: "5", type: "🍓" },
        { id: "6", type: "🍌" },
      ];
      checkForMatchesV2(row);
      forEach(row, (item, index) => {
        if (index === 5) return;
        expect(item.type).toEqual("");
      });
      expect(row[5].type).toEqual("🍌");
    });

    it("will remove the types of all matching items if the match started at index 1", () => {
      const row: BoardRow = [
        { id: "1", type: "🍌" },
        { id: "2", type: "🍓" },
        { id: "3", type: "🍓" },
        { id: "4", type: "🍓" },
        { id: "5", type: "🍓" },
        { id: "6", type: "🍓" },
      ];
      checkForMatchesV2(row);
      forEach(row, (item, index) => {
        if (index === 0) return;
        expect(item.type).toEqual("");
      });
      expect(row[0].type).toEqual("🍌");
    });
  });

  describe("when checking for a match of 4", () => {
    it("will remove the types of all matching items if the match started at index 0", () => {
      const row: BoardRow = [
        { id: "1", type: "🍓" },
        { id: "2", type: "🍓" },
        { id: "3", type: "🍓" },
        { id: "4", type: "🍓" },
        { id: "5", type: "🍑" },
        { id: "6", type: "🍌" },
      ];
      checkForMatchesV2(row);
      console.log(row);
      forEach(row, (item, index) => {
        if (index === 4 || index === 5) return;
        expect(item.type).toEqual("");
      });
      expect(row[4].type).toEqual("🍑");
      expect(row[5].type).toEqual("🍌");
    });

    it("will remove the types of all matching items if the match started at index 1", () => {
      const row: BoardRow = [
        { id: "1", type: "🍌" },
        { id: "2", type: "🍓" },
        { id: "3", type: "🍓" },
        { id: "4", type: "🍓" },
        { id: "5", type: "🍓" },
        { id: "6", type: "🍑" },
      ];
      checkForMatchesV2(row);
      forEach(row, (item, index) => {
        if (index === 0 || index === 5) return;
        expect(item.type).toEqual("");
      });
      expect(row[0].type).toEqual("🍌");
      expect(row[5].type).toEqual("🍑");
    });

    it("will remove the types of all matching items if the match started at index 2", () => {
      const row: BoardRow = [
        { id: "1", type: "🍌" },
        { id: "2", type: "🍑" },
        { id: "3", type: "🍓" },
        { id: "4", type: "🍓" },
        { id: "5", type: "🍓" },
        { id: "6", type: "🍓" },
      ];
      checkForMatchesV2(row);
      forEach(row, (item, index) => {
        if (index === 0 || index === 1) return;
        expect(item.type).toEqual("");
      });
      expect(row[0].type).toEqual("🍌");
      expect(row[1].type).toEqual("🍑");
    });
  });

  describe("when checking for a match of 3", () => {
    it("will remove the types of all matching items if the match started at index 0", () => {
      const row: BoardRow = [
        { id: "1", type: "🍓" },
        { id: "2", type: "🍓" },
        { id: "3", type: "🍓" },
        { id: "4", type: "🥝" },
        { id: "5", type: "🍑" },
        { id: "6", type: "🍌" },
      ];
      checkForMatchesV2(row);
      console.log(row);
      forEach(row, (item, index) => {
        if (index === 3 || index === 4 || index === 5) return;
        expect(item.type).toEqual("");
      });
      expect(row[3].type).toEqual("🥝");
      expect(row[4].type).toEqual("🍑");
      expect(row[5].type).toEqual("🍌");
    });

    it("will remove the types of all matching items if the match started at index 1", () => {
      const row: BoardRow = [
        { id: "1", type: "🍌" },
        { id: "2", type: "🍓" },
        { id: "3", type: "🍓" },
        { id: "4", type: "🍓" },
        { id: "5", type: "🥝" },
        { id: "6", type: "🍑" },
      ];
      checkForMatchesV2(row);
      forEach(row, (item, index) => {
        if (index === 0 || index === 4 || index === 5) return;
        expect(item.type).toEqual("");
      });
      expect(row[0].type).toEqual("🍌");
      expect(row[4].type).toEqual("🥝");
      expect(row[5].type).toEqual("🍑");
    });

    it("will remove the types of all matching items if the match started at index 2", () => {
      const row: BoardRow = [
        { id: "1", type: "🍌" },
        { id: "2", type: "🥝" },
        { id: "3", type: "🍓" },
        { id: "4", type: "🍓" },
        { id: "5", type: "🍓" },
        { id: "6", type: "🍑" },
      ];
      checkForMatchesV2(row);
      forEach(row, (item, index) => {
        if (index === 0 || index === 1 || index === 5) return;
        expect(item.type).toEqual("");
      });
      expect(row[0].type).toEqual("🍌");
      expect(row[1].type).toEqual("🥝");
      expect(row[5].type).toEqual("🍑");
    });

    it("will remove the types of all matching items if the match started at index 3", () => {
      const row: BoardRow = [
        { id: "1", type: "🍌" },
        { id: "2", type: "🍑" },
        { id: "3", type: "🥝" },
        { id: "4", type: "🍓" },
        { id: "5", type: "🍓" },
        { id: "6", type: "🍓" },
      ];
      checkForMatchesV2(row);
      forEach(row, (item, index) => {
        if (index === 0 || index === 1 || index === 2) return;
        expect(item.type).toEqual("");
      });
      expect(row[0].type).toEqual("🍌");
      expect(row[1].type).toEqual("🍑");
      expect(row[2].type).toEqual("🥝");
    });
  });
  describe("when there is no matches", () => {
    const row = [
      { id: "6", type: "🍌" },
      { id: "7", type: "🍒" },
      { id: "8", type: "🍌" },
      { id: "9", type: "🍌" },
      { id: "10", type: "🍑" },
      { id: "11", type: "🥝" },
    ];
    it("will not change the row at all", () => {
      checkForMatchesV2(row);
      expect(row).toEqual(
        expect.arrayContaining([
          { id: "6", type: "🍌" },
          { id: "7", type: "🍒" },
          { id: "8", type: "🍌" },
          { id: "9", type: "🍌" },
          { id: "10", type: "🍑" },
          { id: "11", type: "🥝" },
        ])
      );
    });
  });
});
