export interface Item {
  item: BoardItem;
  onDragStart: (type?: string) => void;
  onDragEnd: (type?: string) => void;
  onDragOver: (type?: string) => void;
}

export interface BoardItem {
  type?: string;
  id: string;
}

export type BoardRow = BoardItem[];

export type Board = BoardRow[];
