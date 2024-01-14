import { BoundingBox } from "framer-motion";
import { RefObject } from "react";

export interface Item {
  type: string;
  legalMoves?: string[];
  id: string;
  constraint?: Partial<BoundingBox> | RefObject<Element> | false;
  onDragStartProp: (type: string) => void;
  onDragEndProp: (type: string) => void;
  onDragOverProp: (type: string) => void;
}

export interface BoardItem {
  type: string;
  id: string;
}

export type BoardRow = BoardItem[];

export type Board = BoardRow[];
