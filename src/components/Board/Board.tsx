import React from 'react'
import { Item } from '../Item';
import {motion} from 'framer-motion'

// Randomly assign a board of items
// Perhaps I should randomly create an id for each item
// {id:"🍅_1l", "🍅"} we can use lodash unique Id for that

const mockFood = [
    { id: "row1", item: ["🍅", "🥒", "🧀", "🥬"] },
    { id: "row2", item: ["🥝", "🍓", "🍑", "🍍"] },
    { id: "row3", item: ["🍌", "🍕", "🍿", "🥚"] },
];

export const Board = () => {

// On drag over we need to check if its a valid move if so we can switch places with the food. If not elastic??
// On drag drop we check if its a valid move then we save the new matrix
// On tap we can make the food a little larger and a little transparent

 return <>
 {
    mockFood.map((row)=> <motion.div key={row.id} style={{ display:"flex", flexDirection:"row" }}>{ row.item.map((col)=> <Item key={col} type={col}/>)} </motion.div> )
 }
 
 </>

}
