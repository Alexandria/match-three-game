import { BoardItem } from "../types";
import { size, map } from "lodash";

export const checkForMatchesV2 = (
  items: BoardItem[],
  start?: number,
  end?: number
): string[] | undefined => {
  const startIndex = start ? start : 0;
  const endIndex = end ? end : 5;
  const sectionToCheckForMatches = items.slice(startIndex, endIndex);

  const allItemsMatch = sectionToCheckForMatches.every((item) => {
    return item.type === sectionToCheckForMatches[0].type;
  });

  if (allItemsMatch) {
    return map(sectionToCheckForMatches, (item) => item.id);
    // EndBase Case
  }

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
};
