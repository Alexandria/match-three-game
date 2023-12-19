import React, { useCallback, useState } from "react";
import { Item } from "../Item";
import { motion } from "framer-motion";
import { Board as BoardType, BoardItem } from "../types";

// Randomly assign a board of items
// Perhaps I should randomly create an id for each item
// {id:"🍅_1l", "🍅"} we can use lodash unique Id for that

const mockFoods: BoardType = [
  {
    id: "0",
    items: [
      { id: "🍅_1", type: "🍅" },
      { id: "🍑_2", type: "🍑" },
      { id: "🧀_3", type: "🧀" },
      { id: "🥒_4", type: "🥒" },
    ],
  },
  {
    id: "1",
    items: [
      { id: "🥝_4", type: "🥝" },
      { id: "🍓_5", type: "🍓" },
      { id: "🍑_6", type: "🍑" },
      { id: "🍍_9", type: "🍍" },
    ],
  },
  {
    id: "2",
    items: [
      { id: "🍌_7", type: "🍌" },
      { id: "🍕_8", type: "🍕" },
      { id: "🍿_8", type: "🍿" },
      { id: "🍍_10", type: "🍍" },
    ],
  },
];

export const Board = () => {
  const [legalMoves, setLegalMoves] = useState<string[] | undefined>();
  const boardIndexBoundaries = {
    lastIndexRow: 3,
    lastIndexCol: 2,
  };

  const [boardState, setBoardState] = useState<BoardType>(mockFoods);
  const [selectedItem, setSelectedItem] = useState<BoardItem | undefined>(
    undefined
  );
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
    setSelectedItem({ id, type });

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
  const handleOnDragEnd = (type: string) => {
    console.warn("onDrag End! On drag is happening on");
  };

  const handleOnDragOver = useCallback(
    (type: string, id: string, rowId: string) => {
      // May need to check if dragging is happening
      if (
        !legalMoves ||
        !legalMoves?.includes(id) ||
        !selectedItem ||
        !selectedRow ||
        !selectedCol
      )
        return;

      const rowIndex = parseInt(rowId);
      const collumnToSwitch = boardState[rowIndex].items.findIndex(
        (item) => item.id === id
      );

      // const updatedBoardState = [...boardState];
      // updatedBoardState[selectedRow].items[selectedCol] = { id, type };
      // updatedBoardState[rowIndex].items[collumnToSwitch] = {
      //   id: selectedItem.id,
      //   type: selectedItem.type,
      // };

      // May need to listen for changes in a use effect?
      // setBoardState(updatedBoardState);

      console.warn("A legal switch operation");
    },
    [legalMoves, boardState, selectedCol, selectedItem, selectedRow]
  );

  console.warn("boardState", boardState);

  return (
    <motion.div>
      {boardState.map((row) => (
        <motion.div
          key={row.id}
          style={{ display: "flex", flexDirection: "row" }}
        >
          {row.items.map(({ id, type }) => (
            <Item
              key={id}
              id={id}
              type={type}
              onDragEndProp={() => handleOnDragEnd(type)}
              onDragStartProp={() => handleOnDragStart(type, id, row.id)}
              onDragOverProp={() => handleOnDragOver(type, id, row.id)}
              legalMoves={legalMoves}
            />
          ))}{" "}
        </motion.div>
      ))}
    </motion.div>
  );
};
