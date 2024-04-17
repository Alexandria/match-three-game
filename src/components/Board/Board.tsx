import React, { useCallback, useEffect, useState } from "react";
import { Item } from "../Item";
import { motion } from "framer-motion";
import { boardWidth } from "../utils/generateBoard";
import { findIndexById } from "../utils/findIndexById";
import { mockBoard } from "../fixtures";
import style from "./Board.module.css";
import { moveItemsDown } from "../utils/moveItemsDown";
import { removeMatchedItems } from "../utils/removeMatchedItems";

const defaultBoard = mockBoard;

export const Board = () => {
  const [legalMoves, setLegalMoves] = useState<string[] | undefined>();
  const [boardState, setBoardState] = useState(defaultBoard);

  const [draggedItem, setDraggedItem] = useState("");
  const [draggedOverItem, setDraggedOverItem] = useState("");

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

    setBoardState([...boardState]);
  }, [draggedItem, draggedOverItem, boardState]);

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

  useEffect(() => {
    const timer = setInterval(() => {
      removeMatchedItems(boardState, () => {});
      // TODO: Check if items was actually removed before setting board state
      setBoardState([...boardState]);
    }, 100);

    return () => clearInterval(timer);
  }, [boardState]);

  useEffect(() => {
    moveItemsDown(boardState);
  }, [boardState]);

  return (
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
            {row.map(({ id, type, animate, visibility, isMatch }) => {
              return (
                <Item
                  key={id}
                  item={{
                    type,
                    id,
                    animate,
                    visibility,
                    draggable: true,
                    isMatch,
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
  );
};
