import { Board, BoardRow } from "./types";

export const mockBoard: Board = [
  [
    { id: "1", type: "🍓" },
    { id: "2", type: "🍌" },
    { id: "3", type: "🍓" },
    { id: "4", type: "🍑" },
    { id: "5", type: "🍑" },
  ],
  [
    { id: "6", type: "🍌" },
    { id: "7", type: "🍒" },
    { id: "8", type: "🍌" },
    { id: "9", type: "🍌" },
    { id: "10", type: "🍑" },
  ],
  [
    { id: "11", type: "🍑" },
    { id: "12", type: "🍑" },
    { id: "13", type: "🍌" },
    { id: "14", type: "🥝" },
    { id: "15", type: "🥝" },
  ],
  [
    { id: "16", type: "🥝" },
    { id: "17", type: "🍌" },
    { id: "18", type: "🥝" },
    { id: "19", type: "🍌" },
    { id: "20", type: "🍑" },
  ],
  [
    { id: "21", type: "🍑" },
    { id: "22", type: "🍌" },
    { id: "23", type: "🍒" },
    { id: "24", type: "🍑" },
    { id: "25", type: "🥝" },
  ],
];

export const mockEmptyBoard: Board = [
  [
    { id: "1", type: "🍓" },
    { id: "2", type: "🍌" },
    { id: "3", type: "🍓" },
    { id: "4", type: "🍑" },
    { id: "5", type: "🍑" },
  ],
  [
    { id: "6", type: "🍌" },
    { id: "7", type: "🍒" },
    { id: "8", type: "🍌" },
    { id: "9", type: "🍌" },
    { id: "10", type: "🍑" },
  ],
  [
    { id: "11", type: "🍑" },
    { id: "12", type: "🍑" },
    { id: "13", type: "" },
    { id: "14", type: "" },
    { id: "15", type: "" },
  ],
  [
    { id: "16", type: "🥝" },
    { id: "17", type: "🍌" },
    { id: "18", type: "🥝" },
    { id: "19", type: "" },
    { id: "20", type: "" },
  ],
  [
    { id: "21", type: "🍑" },
    { id: "22", type: "🍌" },
    { id: "23", type: "🍒" },
    { id: "24", type: "🍑" },
    { id: "25", type: "🥝" },
  ],
];

export const mockBoardSize3 = [
  [
    { id: "1", type: "🍓" },
    { id: "2", type: "🍌" },
    { id: "3", type: "🍓" },
  ],
  [
    { id: "6", type: "🍌" },
    { id: "7", type: "🍒" },
    { id: "8", type: "🍌" },
  ],
  [
    { id: "11", type: "🍑" },
    { id: "12", type: "🍑" },
    { id: "13", type: "🍒" },
  ],
];

export const updateRowInMockBoard = (row: BoardRow, indexToReplace: number) => {
  const newBoard = [...mockBoard];

  newBoard.splice(indexToReplace, 1, row);

  return newBoard;
};
