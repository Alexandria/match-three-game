import { BoardItem } from "../types";
import { size, forEach, delay } from "lodash";

const removeItem = (item: BoardItem) => {
  delay(() => {
    item.type = "";
    setIsMatchFalse(item);
  }, 500);
};

const removeMatchingFruit = (item: BoardItem) => {
  item.isMatch = true;
  removeItem(item);
};

const setIsMatchFalse = (item: BoardItem) => {
  item.isMatch = false;
};

export const checkForMatchesV2 = (
  items: BoardItem[],
  start?: number,
  end?: number
): void => {
  const isCol = size(items) === 6 ? true : false;
  const startIndex = start ? start : 0;
  const endIndex = end ? end : size(items);

  const arrayOfFruit = items.slice(startIndex, endIndex);

  const allItemsMatch = arrayOfFruit.every((fruit) => {
    if (fruit.type === "") return false;
    return fruit.type === arrayOfFruit[0].type;
  });

  if (allItemsMatch) {
    forEach(arrayOfFruit, removeMatchingFruit);
    return;
  }

  if (isCol) {
    if (size(arrayOfFruit) === 6) {
      if (startIndex === 0) return checkForMatchesV2([...items], 0, 5);
    }

    if (size(arrayOfFruit) === 5) {
      if (startIndex === 0) return checkForMatchesV2([...items], 1, 6);
      if (startIndex === 1) return checkForMatchesV2([...items], 0, 4);
    }

    if (size(arrayOfFruit) === 4) {
      if (startIndex === 0) return checkForMatchesV2([...items], 1, 5);
      if (startIndex === 1) return checkForMatchesV2([...items], 2, 6);
      if (startIndex === 2) return checkForMatchesV2([...items], 0, 3);
    }

    if (size(arrayOfFruit) === 3) {
      if (startIndex === 0) return checkForMatchesV2([...items], 1, 4);
      if (startIndex === 1) return checkForMatchesV2([...items], 2, 5);
      if (startIndex === 2) return checkForMatchesV2([...items], 3, 6);
      return;
    }
  }

  if (!isCol) {
    if (size(arrayOfFruit) === 5) {
      if (startIndex === 0) return checkForMatchesV2([...items], 0, 4);
    }

    if (size(arrayOfFruit) === 4) {
      if (startIndex === 0) return checkForMatchesV2([...items], 1, 5);
      if (startIndex === 1) return checkForMatchesV2([...items], 0, 3);
    }

    if (size(arrayOfFruit) === 3) {
      if (startIndex === 0) return checkForMatchesV2([...items], 1, 4);
      if (startIndex === 1) return checkForMatchesV2([...items], 2, 6);
      if (startIndex === 2) return;
    }
  }
};
