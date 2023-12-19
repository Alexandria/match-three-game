import { motion } from "framer-motion";

import { Item as ItemProps } from "../types";
import { useState } from "react";
import styles from "./Item.module.css";

//https://github.com/framer/motion/issues/538
//https://dev.to/ayka_code/creating-a-draggable-element-with-limits-and-smooth-animations-using-framer-motion-2cki
export const Item = ({
  type,
  constraint = false,
  onDragEndProp,
  onDragOverProp,
  onDragStartProp,
}: ItemProps) => {
  const [isDragging, setIsDragging] = useState(false);

  // could we use dragSnapToOrigin to acheive the smooth animation effect?
  // could we get the drag start position then update origin positions based on what the object is moving over?

  return (
    <motion.div
      dragSnapToOrigin
      drag
      dragConstraints={constraint}
      onDragStart={(event, info) => {
        setIsDragging(true);
        onDragStartProp(type);
      }}
      onDragEnd={(event, info) => {
        setIsDragging(false);
        onDragEndProp(type);
      }}
      onPointerEnter={() => {
        onDragOverProp(type);
        console.log("Its happening! I am being passed over ", type);
      }}
      style={{ pointerEvents: isDragging ? "none" : "auto" }}
    >
      <p className={styles.item}> {type} </p>
    </motion.div>
  );
};
