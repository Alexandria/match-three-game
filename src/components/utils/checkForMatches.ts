import { BoardItem } from "../types";

export const checkForMatches = (
  items: BoardItem[],
  start?: number,
  end?: number
): string[] | undefined => {
  const row = [...items];
  const startIndex = start ? start : 0;
  const endIndex = end ? end : 5;
  const sectionToCheckForMatches =
    endIndex === 5 ? row.slice(startIndex) : row.slice(startIndex, endIndex);
  const sectionLength = sectionToCheckForMatches.length;
  const firstItemInSection = sectionToCheckForMatches[0];
  const idsOfSection: string[] = [];

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
};
