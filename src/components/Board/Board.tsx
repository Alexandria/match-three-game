import React, { useCallback, useEffect, useState } from "react";
import { Item } from "../Item";
import { motion } from "framer-motion";
import { Board as BoardType, BoardItem } from "../types";
import { range, forEach } from "lodash";
import { generateBoard } from "../utils/generateBoard";
import { findIndexById } from "../utils/findIndexById";

export const Board = () => {
  const randomBoard = generateBoard();
  const [legalMoves, setLegalMoves] = useState<string[] | undefined>();

  const [boardState, setBoardState] = useState<BoardType>(randomBoard);

  const [draggedItem, setDraggedItem] = useState("");
  const [draggedOverItem, setDraggedOverItem] = useState("");

  const handleOnDragStart = (type: string, id: string, rowIndex: number) => {
    let adjacentMoves: string[] = [];
    const currentRow = boardState[rowIndex];
    const currentColIndex = currentRow?.findIndex((item) => item.id === id)!;

    setDraggedItem(id);

    if (currentColIndex + 1 <= 4) {
      adjacentMoves.push(currentRow[currentColIndex + 1].id);
    }

    if (currentColIndex - 1 >= 0) {
      adjacentMoves.push(currentRow[currentColIndex - 1].id);
    }

    if (rowIndex - 1 >= 0) {
      adjacentMoves.push(boardState[rowIndex - 1][currentColIndex].id);
    }

    if (rowIndex + 1 <= 4) {
      adjacentMoves.push(boardState[rowIndex + 1][currentColIndex].id);
    }

    setLegalMoves(adjacentMoves);
  };

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

  const handleOnDragEnd = useCallback(() => {
    if (!draggedItem || !draggedOverItem) return;

    const draggedItemIndex = findIndexById(draggedItem, boardState);
    const draggedOverItemIndex = findIndexById(draggedOverItem, boardState);

    const itemBeingDragged =
      boardState[draggedItemIndex.row][draggedItemIndex.col];
    const itemBeingDraggedOver =
      boardState[draggedOverItemIndex.row][draggedOverItemIndex.col];

    boardState[draggedItemIndex.row][draggedItemIndex.col] =
      itemBeingDraggedOver;

    boardState[draggedOverItemIndex.row][draggedOverItemIndex.col] =
      itemBeingDragged;

    setBoardState([...boardState]);
  }, [boardState, draggedItem, draggedOverItem]);

  const handleOnDragOver = useCallback(
    (type: string, id: string, rowIndex: number) => {
      if (!legalMoves || !draggedItem) return;

      if (legalMoves.includes(id)) {
        setDraggedOverItem(id);
      } else {
        setDraggedOverItem("");
      }
    },
    [draggedItem, legalMoves, setDraggedOverItem]
  );

  useEffect(() => {
    boardState.forEach((row, index) => {
      const column: BoardItem[] = [];
      checkForMatches(row);
      forEach(range(5), (colIndex) => {
        const col = boardState[colIndex][index];
        column.push(col);
      });
      checkForMatches(column);
    });
  }, [boardState, checkForMatches]);

  return (
    <motion.div>
      {boardState.map((row, index) => {
        return (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            {row.map(({ id, type }) => (
              <Item
                key={id}
                item={{ type, id }}
                onDragEnd={() => handleOnDragEnd()}
                onDragStart={() => handleOnDragStart(type, id, index)}
                onDragOver={() => handleOnDragOver(type, id, index)}
              />
            ))}
          </div>
        );
      })}
    </motion.div>
  );
};
