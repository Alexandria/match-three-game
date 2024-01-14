import React, { useCallback, useEffect, useState } from "react";
import { Item } from "../Item";
import { motion } from "framer-motion";
import { Board as BoardType, BoardItem } from "../types";
import { range, forEach } from "lodash";
import { useGenerateBoard } from "../hooks/useGenerateBoard";

export const Board = () => {
  const randomBoard = useGenerateBoard();
  const [legalMoves, setLegalMoves] = useState<string[] | undefined>();

  const [boardState, setBoardState] = useState<BoardType>(randomBoard);
  const [selectedItem, setSelectedItem] = useState<
    { row: number; col: number } | undefined
  >(undefined);
  const [dragOverItem, setDragOverItem] = useState<
    { row: number; col: number } | undefined
  >(undefined);

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
  };

  // Go through the board and remove any matches 3 or more.
  // Check the row
  // Check the column

  const checkForMatches = useCallback(
    (
      items: BoardItem[],
      start?: number,
      end?: number
    ): BoardItem[] | undefined => {
      const row = [...items];
      const startIndex = start ? start : 0;
      const endIndex = end ? end : 5;
      const sectionToCheckForMatches =
        endIndex === 5
          ? row.slice(startIndex)
          : row.slice(startIndex, endIndex);
      const sectionLength = sectionToCheckForMatches.length;
      const firstItemInSection = sectionToCheckForMatches[0];

      if (
        sectionToCheckForMatches.every(
          (item) => item.type === firstItemInSection.type
        )
      ) {
        console.warn(
          `We have a match of ${sectionLength}!! of type ${firstItemInSection.type}`
        );
        return sectionToCheckForMatches;
      }

      if (endIndex === 5) {
        checkForMatches(items, 0, 4);
      }

      if (sectionLength === 4 && startIndex === 0) {
        checkForMatches(items, 1, 6);
      }

      if (sectionLength === 4 && startIndex === 1) {
        checkForMatches(items, 0, 3);
      }

      if (sectionLength === 3 && startIndex === 0) {
        checkForMatches(items, 1, 4);
      }

      if (sectionLength === 3 && startIndex === 1) {
        checkForMatches(items, 2, 6);
      }

      if (sectionLength === 3 && startIndex === 2) {
        return;
      }
    },
    []
  );

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

      setBoardState([...boardState]);
    },
    [selectedItem, boardState, dragOverItem]
  );

  const handleOnDragOver = useCallback(
    (type: string, id: string, rowId: string) => {
      // May need to check if dragging is happening
      if (!legalMoves || !selectedItem) return;

      const rowIndex = parseInt(rowId);

      let col = boardState[rowIndex].items.findIndex((item) => item.id === id);

      if (legalMoves.includes(id)) {
        setDragOverItem({ row: rowIndex, col });
      } else {
        setDragOverItem(undefined);
      }
    },
    [legalMoves, boardState, selectedItem]
  );

  useEffect(() => {
    // When the board state changes, check for matches!
    // console.warn("the board state changed! ", boardState);
    boardState.forEach((row, index) => {
      const column: BoardItem[] = [];
      checkForMatches(row.items);
      forEach(range(5), (colIndex) => {
        const col = boardState[colIndex].items[index];
        column.push(col);
      });
      checkForMatches(column);
    });
  }, [boardState, checkForMatches]);

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
