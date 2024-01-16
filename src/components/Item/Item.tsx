import React, { useState } from "react";
import { motion } from "framer-motion";
import { Item as ItemProps } from "../types";
import styles from "./Item.module.css";

//https://github.com/framer/motion/issues/538
//https://dev.to/ayka_code/creating-a-draggable-element-with-limits-and-smooth-animations-using-framer-motion-2cki
export const Item = ({
  item,
  onDragEnd: onDragEndProp,
  onDragOver: onDragOverProp,
  onDragStart: onDragStartProp,
}: ItemProps) => {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <motion.div
      aria-label="draggable-item"
      dragSnapToOrigin
      dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
      drag
      // dragConstraints={constraint}
      onDragStart={(event, info) => {
        setIsDragging(true);
        onDragStartProp(item.type);
      }}
      onDragEnd={(event, info) => {
        setIsDragging(false);
        onDragEndProp(item.type);
      }}
      onPointerEnter={() => {
        onDragOverProp(item.type);
      }}
      style={{ pointerEvents: isDragging ? "none" : "auto" }}
    >
      <p className={styles.item} aria-label="paragraph">
        {item.type}
      </p>
    </motion.div>
  );
};
