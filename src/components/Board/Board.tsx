import React, { useCallback, useState } from "react";
import { Item } from "../Item";
import { motion } from "framer-motion";
import { boardWidth } from "../utils/generateBoard";
import { findIndexById } from "../utils/findIndexById";
import { mockBoard } from "../fixtures";
import style from "./Board.module.css";
import { moveItemsDown } from "../utils/moveItemsDown";
import {
  removeColumnMatches,
  removeRowMatches,
} from "../utils/removeMatchedItems";

const boardState = mockBoard;

export const Board = () => {
  const [legalMoves, setLegalMoves] = useState<string[] | undefined>();

  const [draggedItem, setDraggedItem] = useState("");
  const [draggedOverItem, setDraggedOverItem] = useState("");
  const [score, setScore] = useState(0);

  const handleOnDragStart = (id: string, rowIndex: number) => {
    let adjacentMoves: string[] = [];
    const currentRow = boardState[rowIndex];
    const currentColIndex = currentRow?.findIndex((item) => item.id === id)!;

    setDraggedItem(id);

    if (currentColIndex + 1 <= boardWidth - 1) {
      adjacentMoves.push(currentRow[currentColIndex + 1].id);
    }

    if (currentColIndex - 1 >= 0) {
      adjacentMoves.push(currentRow[currentColIndex - 1].id);
    }

    if (rowIndex - 1 >= 0) {
      adjacentMoves.push(boardState[rowIndex - 1][currentColIndex].id);
    }

    if (rowIndex + 1 <= boardWidth - 1) {
      adjacentMoves.push(boardState[rowIndex + 1][currentColIndex].id);
    }

    setLegalMoves(adjacentMoves);
  };

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

    let boardHasMatches: boolean = true;

    do {
      const rowMatchesRemoved = removeRowMatches(boardState, setScore);
      const colMatchesRemoved = removeColumnMatches(boardState, setScore);
      moveItemsDown(boardState);
      const matchesFound = rowMatchesRemoved || colMatchesRemoved;
      if (!matchesFound) {
        boardHasMatches = false;
      }
    } while (boardHasMatches);
  }, [draggedItem, draggedOverItem]);

  const handleOnDragOver = useCallback(
    (id: string) => {
      if (!legalMoves || !draggedItem) return;

      if (legalMoves.includes(id)) {
        setDraggedOverItem(id);
      } else {
        setDraggedOverItem("");
      }
    },
    [draggedItem, legalMoves, setDraggedOverItem]
  );

  return (
    <div>
      {/* <p>{score}</p> */}
      <motion.div aria-label="game board" className={style.Board}>
        {boardState.map((row, index) => {
          return (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              {row.map(({ id, type, animate, visibility }) => {
                return (
                  <Item
                    key={id}
                    animate={animate ?? false}
                    item={{
                      type,
                      id,
                      visibility,
                      draggable: true,
                    }}
                    onDragEnd={() => handleOnDragEnd()}
                    onDragStart={() => handleOnDragStart(id, index)}
                    onDragOver={() => handleOnDragOver(id)}
                  />
                );
              })}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};
