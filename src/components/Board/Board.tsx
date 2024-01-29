import React, { useCallback, useState } from "react";
import { Item } from "../Item";
import { motion } from "framer-motion";
import { Board as BoardType, BoardItem } from "../types";
import { forEach, some } from "lodash";
import { boardWidth, generateRandomEmoji } from "../utils/generateBoard";
import { findIndexById } from "../utils/findIndexById";
import { mockBoard } from "../fixtures";
import style from "./Board.module.css";
import { moveItemsDown } from "../utils/moveItemsDown";
import { checkForMatches } from "../utils/checkForMatches";

export const Board = () => {
  const [legalMoves, setLegalMoves] = useState<string[] | undefined>();

  const [boardState, setBoardState] = useState<BoardType>(mockBoard);

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

  const removeById = (itemsToRemove: string[]) => (item: BoardItem) => {
    if (itemsToRemove.includes(item.id)) {
      item.type = "";
    }
  };

  const removeMatchesFromBoard = useCallback(() => {
    some(boardState, (row, colIndex) => {
      const column: BoardItem[] = [];

      const indexOfMatches = checkForMatches(row);
      if (indexOfMatches) {
        some(row, removeById(indexOfMatches));
        const points = indexOfMatches.length * 3;
        setScore(score + points);
      }
      forEach(row, (value, rowIndex) => {
        const col = boardState[rowIndex][colIndex];
        column.push(col);
      });
      const indexOfColMatches = checkForMatches(column);
      if (indexOfColMatches) {
        some(column, removeById(indexOfColMatches));
        const points = indexOfColMatches.length * 3;
        setScore(score + points);
      }
    });
  }, [boardState, score]);

  const fillTopRow = useCallback(() => {
    forEach(boardState[0], (item) => {
      if (!item.type) {
        item.type = generateRandomEmoji();
      }
    });
  }, [boardState]);

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

    let boardHasEmptySpots: boolean = false;

    do {
      removeMatchesFromBoard();
      moveItemsDown(boardState);
      boardHasEmptySpots = some(boardState, (row) =>
        some(row, (item) => item.type === "")
      );
      fillTopRow();
    } while (boardHasEmptySpots);

    setBoardState([...boardState]);
  }, [
    boardState,
    draggedItem,
    draggedOverItem,
    removeMatchesFromBoard,
    fillTopRow,
  ]);

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
      <p>{score}</p>
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
              {row.map(({ id, type }) => (
                <Item
                  key={id}
                  item={{ type, id }}
                  onDragEnd={() => handleOnDragEnd()}
                  onDragStart={() => handleOnDragStart(id, index)}
                  onDragOver={() => handleOnDragOver(id)}
                />
              ))}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};
