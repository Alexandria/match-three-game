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

  const [draggedItem, setDraggedItem] = useState("");
  const [draggedOverItem, setDraggedOverItem] = useState("");

  // On drag over we need to check if its a valid move if so we can switch places with the food. If not elastic??
  // On drag drop we check if its a valid move then we save the new matrix
  // On tap we can make the food a little larger and a little transparent

  const handleOnDragStart = (type: string, id: string, rowIndex: number) => {
    let adjacentMoves: string[] = [];
    const currentRow = boardState[rowIndex];
    const currentColIndex = currentRow?.findIndex((item) => item.id === id)!;

    setDraggedItem(id);

    if (currentColIndex + 1 <= 3) {
      adjacentMoves.push(currentRow[currentColIndex + 1].id);
    }

    if (currentColIndex - 1 >= 0) {
      adjacentMoves.push(currentRow[currentColIndex - 1].id);
    }

    if (rowIndex - 1 >= 0) {
      adjacentMoves.push(boardState[rowIndex - 1][currentColIndex].id);
    }

    if (rowIndex + 1 <= 2) {
      adjacentMoves.push(boardState[rowIndex + 1][currentColIndex].id);
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

  const handleOnDragEnd = useCallback(() => {
    if (!draggedItem || !draggedOverItem) return;

    let columnOfDraggedItem: number;
    let rowOfDraggedItem: number;

    let colOfDraggedOverItem: number;
    let rowOfDraggedOverItem: number;
    // switch items based on id
    boardState.forEach((row, index) => {
      const col = Object.values(row).findIndex((item) => {
        return item.id === draggedItem;
      });

      if (col !== -1) {
        columnOfDraggedItem = col;
        rowOfDraggedItem = index;
      }
    });

    boardState.forEach((row, index) => {
      const col = Object.values(row).findIndex((item) => {
        return item.id === draggedOverItem;
      });

      if (col !== -1) {
        colOfDraggedOverItem = col;
        rowOfDraggedOverItem = index;
      }
    });

    const itemBeingDragged =
      boardState[rowOfDraggedItem!][columnOfDraggedItem!];
    const itemBeingDraggedOver =
      boardState[rowOfDraggedOverItem!][colOfDraggedOverItem!];

    boardState[rowOfDraggedItem!][columnOfDraggedItem!] = itemBeingDraggedOver;

    boardState[rowOfDraggedOverItem!][colOfDraggedOverItem!] = itemBeingDragged;

    console.log("columnOfDragged", columnOfDraggedItem!);
    console.log("rowOfDraggedItem", rowOfDraggedItem!);

    console.log("colOfDraggedOverItem", colOfDraggedOverItem!);
    console.log("rowOfDraggedOverItem", rowOfDraggedOverItem!);

    setBoardState([...boardState]);
  }, [boardState, draggedItem, draggedOverItem]);

  const handleOnDragOver = useCallback(
    (type: string, id: string, rowIndex: number) => {
      // May need to check if dragging is happening
      if (!legalMoves || !draggedItem) return;
      console.log("legal moves ", legalMoves);

      if (legalMoves.includes(id)) {
        setDraggedOverItem(id);
      } else {
        setDraggedOverItem("");
      }

      console.log("on drag over");
    },
    [draggedItem, legalMoves, setDraggedOverItem]
  );

  useEffect(() => {
    // When the board state changes, check for matches!
    // console.warn("the board state changed! ", boardState);
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
                id={id}
                type={type}
                onDragEndProp={() => handleOnDragEnd()}
                onDragStartProp={() => handleOnDragStart(type, id, index)}
                onDragOverProp={() => handleOnDragOver(type, id, index)}
                legalMoves={legalMoves}
              />
            ))}
          </div>
        );
      })}
    </motion.div>
  );
};
