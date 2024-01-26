import React, { useCallback, useState } from "react";
import { Item } from "../Item";
import { motion } from "framer-motion";
import { Board as BoardType, BoardItem } from "../types";
import { forEach, some } from "lodash";
import { generateRandomEmoji } from "../utils/generateBoard";
import { findIndexById } from "../utils/findIndexById";
import { mockBoard } from "../fixtures";
import style from "./Board.module.css";

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

  // I need to actually end out of this loop when the desired effect takes places
  // Currently it looks like the function always returns undfined even when there is a match.

  const checkForMatches = useCallback(
    (
      items: BoardItem[],
      start?: number,
      end?: number
    ): string[] | undefined => {
      const row = [...items];
      const startIndex = start ? start : 0;
      const endIndex = end ? end : 5;
      const sectionToCheckForMatches =
        endIndex === 5
          ? row.slice(startIndex)
          : row.slice(startIndex, endIndex);
      const sectionLength = sectionToCheckForMatches.length;
      const firstItemInSection = sectionToCheckForMatches[0];
      const idsOfSection: string[] = [];

      // Basecase
      if (
        sectionToCheckForMatches.every((item) => {
          idsOfSection.push(item.id);
          return item.type === firstItemInSection.type;
        })
      ) {
        console.warn(
          `We have a match of ${sectionLength}!! of type ${firstItemInSection.type}: StartNdx: ${startIndex} EndNdx: ${endIndex}`
        );

        return idsOfSection;
        // EndBase Case
      } else {
        if (endIndex === 5) {
          return checkForMatches(items, 0, 4);
        }

        if (sectionLength === 4 && startIndex === 0) {
          return checkForMatches(items, 1, 6);
        }

        if (sectionLength === 4 && startIndex === 1) {
          return checkForMatches(items, 0, 3);
        }

        if (sectionLength === 3 && startIndex === 0) {
          return checkForMatches(items, 1, 4);
        }

        if (sectionLength === 3 && startIndex === 1) {
          return checkForMatches(items, 2, 6);
        }
        return;
      }
    },
    []
  );

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
  }, [boardState, checkForMatches, score]);

  const fillBoardFromTheTop = useCallback(() => {
    forEach(boardState, (row, rowIndex) => {
      debugger;
      forEach(row, (item, colIndex) => {
        if (rowIndex === 0 && !item.type) {
          item.type = generateRandomEmoji();
        }
      });
    });
  }, [boardState]);

  const moveItemsDown = useCallback(() => {
    forEach(boardState, (row, rowIndex) => {
      forEach(row, (item, colIndex) => {
        if (rowIndex === 0) return false;
        if (item.type === "") {
          const itemAbove = boardState[rowIndex - 1][colIndex];
          const currentItem = boardState[rowIndex][colIndex];
          boardState[rowIndex][colIndex] = itemAbove;
          boardState[rowIndex - 1][colIndex] = currentItem;
        }
      });
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

    removeMatchesFromBoard();
    let boardHasEmptySpots: boolean = false;

    do {
      moveItemsDown();
      fillBoardFromTheTop();
      removeMatchesFromBoard();
      boardHasEmptySpots = some(boardState, (row) =>
        some(row, (item) => item.type === "")
      );
    } while (boardHasEmptySpots);
    setBoardState([...boardState]);
  }, [
    boardState,
    draggedItem,
    draggedOverItem,
    removeMatchesFromBoard,
    fillBoardFromTheTop,
    moveItemsDown,
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
