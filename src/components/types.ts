export interface BoardItem {
  type?: string;
  id: string;
  animate?: boolean;
  visibility?: boolean;
  draggable?: boolean;
  delay?: number;
  isMatch?: boolean;
}

export type BoardRow = BoardItem[];

export type Board = BoardRow[];
