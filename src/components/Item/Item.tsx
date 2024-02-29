import React, { useState } from "react";
import { motion } from "framer-motion";
import { BoardItem } from "../types";
import styles from "./Item.module.css";

//https://github.com/framer/motion/issues/538
//https://dev.to/ayka_code/creating-a-draggable-element-with-limits-and-smooth-animations-using-framer-motion-2cki
export interface Props {
  item: BoardItem;
  animate: boolean;
  delay?: number;
  onDragStart?: (type?: string) => void;
  onDragEnd?: (type?: string) => void;
  onDragOver?: (type?: string) => void;
}

export const Item = ({
  item,
  animate,
  onDragEnd: onDragEndProp,
  onDragOver: onDragOverProp,
  onDragStart: onDragStartProp,
}: Props) => {
  const [isDragging, setIsDragging] = useState(false);

  const isItemVisible = (() => {
    if (item.visibility === undefined) {
      return true;
    }
    return item.visibility;
  })();

  const isItemDraggable = (() => {
    if (item.draggable === undefined) {
      return true;
    }

    return item.draggable;
  })();

  // If animate has changed then set visible to true

  console.log("delay", item.delay);
  return (
    <motion.div
      className={styles.itemContainer}
      aria-label="draggable-item"
      animate={{ y: animate ? 5 : undefined }}
      transition={{
        type: "spring",
        duration: 0.8,
        bounce: 0.6,
        delay: item.delay,
      }}
      dragSnapToOrigin
      dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
      drag={isItemDraggable}
      // dragConstraints={constraint}
      onDragStart={(event, info) => {
        setIsDragging(true);
        onDragStartProp?.(item.type);
      }}
      onDragEnd={(event, info) => {
        setIsDragging(false);
        onDragEndProp?.(item.type);
      }}
      onPointerEnter={() => {
        onDragOverProp?.(item.type);
      }}
      style={{
        pointerEvents: isDragging ? "none" : "auto",
        visibility: isItemVisible ? "visible" : "hidden",
      }}
    >
      <p className={styles.item} aria-label="paragraph">
        {item.type}
      </p>
    </motion.div>
  );
};
