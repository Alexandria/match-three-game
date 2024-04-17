import { BoardItem } from "../types";
import { size, forEach, delay } from "lodash";

const removeItem = (item: BoardItem) => {
  delay(() => {
    item.type = "";
    setIsMatchFalse(item);
  }, 500);
};

const setIsMatch = (item: BoardItem) => {
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
  const sectionToCheckForMatches = items.slice(startIndex, endIndex);

  const allItemsMatch = sectionToCheckForMatches.every((item) => {
    if (item.type === "") return false;
    return item.type === sectionToCheckForMatches[0].type;
  });

  if (allItemsMatch) {
    forEach(sectionToCheckForMatches, setIsMatch);
    return;
  }
  if (isCol) {
    if (size(sectionToCheckForMatches) === 6) {
      if (startIndex === 0) return checkForMatchesV2([...items], 0, 5);
    }

    if (size(sectionToCheckForMatches) === 5) {
      if (startIndex === 0) return checkForMatchesV2([...items], 1, 6);
      if (startIndex === 1) return checkForMatchesV2([...items], 0, 4);
    }

    if (size(sectionToCheckForMatches) === 4) {
      if (startIndex === 0) return checkForMatchesV2([...items], 1, 5);
      if (startIndex === 1) return checkForMatchesV2([...items], 2, 6);
      if (startIndex === 2) return checkForMatchesV2([...items], 0, 3);
    }

    if (size(sectionToCheckForMatches) === 3) {
      if (startIndex === 0) return checkForMatchesV2([...items], 1, 4);
      if (startIndex === 1) return checkForMatchesV2([...items], 2, 5);
      if (startIndex === 2) return checkForMatchesV2([...items], 3, 6);
      return;
    }
  }

  if (!isCol) {
    if (size(sectionToCheckForMatches) === 5) {
      if (startIndex === 0) return checkForMatchesV2([...items], 0, 4);
    }

    if (size(sectionToCheckForMatches) === 4) {
      if (startIndex === 0) return checkForMatchesV2([...items], 1, 5);
      if (startIndex === 1) return checkForMatchesV2([...items], 0, 3);
    }

    if (size(sectionToCheckForMatches) === 3) {
      if (startIndex === 0) return checkForMatchesV2([...items], 1, 4);
      if (startIndex === 1) return checkForMatchesV2([...items], 2, 6);
      if (startIndex === 2) return;
    }
  }
};
