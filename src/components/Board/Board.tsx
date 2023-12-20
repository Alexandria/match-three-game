import React, { useCallback, useState } from "react";
import { Item } from "../Item";
import { motion } from "framer-motion";
import { Board as BoardType, BoardItem } from "../types";
import { uniqueId, random } from "lodash";

const emojiItems = ["🍌", "🍑", "🍓", "🥝", "🍒"];
const boardWidth = 5;

const generateRandomBoardItem = (): BoardItem => {
  const randomEmoji = emojiItems[random(boardWidth - 1)];
  return { id: uniqueId(), type: randomEmoji };
};

const generateItems = (): BoardItem[] => {
  const randomItems: BoardItem[] = [];

  for (let i = 0; i < boardWidth; i++) {
    const randomEmoji = generateRandomBoardItem();
    randomItems.push(randomEmoji);
  }

  return randomItems;
};

const generateRandomBoard = (): BoardType => {
  const board: BoardType = [];
  for (let i = 0; i < boardWidth; i++) {
    const row = { id: String(i), items: generateItems() };
    board.push(row);
  }

  return board;
};

export const Board = () => {
  const randomBoard = generateRandomBoard();
  const [legalMoves, setLegalMoves] = useState<string[] | undefined>();

  const [boardState, setBoardState] = useState<BoardType>(randomBoard);
  const [selectedItem, setSelectedItem] = useState<
    { row: number; col: number } | undefined
  >(undefined);
  const [dragOverItem, setDragOverItem] = useState<
    { row: number; col: number } | undefined
  >(undefined);
  const [selectedRow, setSelectedRow] = useState<number | undefined>();
  const [selectedCol, setSelectedCol] = useState<number | undefined>();

  // On drag over we need to check if its a valid move if so we can switch places with the food. If not elastic??
  // On drag drop we check if its a valid move then we save the new matrix
  // On tap we can make the food a little larger and a little transparent

  const handleOnDragStart = (type: string, id: string, rowId: string) => {
    let adjacentMoves: string[] = [];
    const rowIndex = parseInt(rowId);
    const currentRow = boardState[rowIndex];
    const currentColIndex = currentRow?.items.findIndex(
      (item) => item.id === id
    )!;

    setSelectedRow(rowIndex);
    setSelectedCol(currentColIndex);
    setSelectedItem({ row: rowIndex, col: currentColIndex });

    if (currentColIndex + 1 <= 3) {
      adjacentMoves.push(currentRow.items[currentColIndex + 1].id);
    }

    if (currentColIndex - 1 >= 0) {
      adjacentMoves.push(currentRow.items[currentColIndex - 1].id);
    }

    if (rowIndex - 1 >= 0) {
      adjacentMoves.push(boardState[rowIndex - 1].items[currentColIndex].id);
    }

    if (rowIndex + 1 <= 2) {
      adjacentMoves.push(boardState[rowIndex + 1].items[currentColIndex].id);
    }

    setLegalMoves(adjacentMoves);

    console.warn("onDrag start! On drag is happening on");
  };
  const handleOnDragEnd = useCallback(
    (type: string, id: string, rowId: string) => {
      if (!selectedItem || !dragOverItem) return;

      const itemBeingDragged =
        boardState[selectedItem.row].items[selectedItem.col];
      const itemBeingDraggedOver =
        boardState[dragOverItem.row].items[dragOverItem.col];

      boardState[selectedItem.row].items[selectedItem.col] =
        itemBeingDraggedOver;

      boardState[dragOverItem.row].items[dragOverItem.col] = itemBeingDragged;

      console.warn("onDrag End! On drag is happening on", { id, type });
    },
    [selectedItem, boardState, dragOverItem]
  );

  const handleOnDragOver = useCallback(
    (type: string, id: string, rowId: string) => {
      // May need to check if dragging is happening
      if (!legalMoves || !selectedItem) return;

      const rowIndex = parseInt(rowId);

      console.warn("A legal switch operation");
      let col = boardState[rowIndex].items.findIndex((item) => item.id === id);

      if (legalMoves.includes(id)) {
        setDragOverItem({ row: rowIndex, col });
      } else {
        setDragOverItem(undefined);
      }
    },
    [legalMoves, boardState, selectedItem]
  );

  console.warn("boardState", boardState);

  return (
    <motion.div>
      {boardState.map((row) => (
        <motion.div
          key={row.id}
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          {row.items.map(({ id, type }) => (
            <Item
              key={id}
              id={id}
              type={type}
              onDragEndProp={() => handleOnDragEnd(type, id, row.id)}
              onDragStartProp={() => handleOnDragStart(type, id, row.id)}
              onDragOverProp={() => handleOnDragOver(type, id, row.id)}
              legalMoves={legalMoves}
            />
          ))}
        </motion.div>
      ))}
    </motion.div>
  );
};
