import {motion, BoundingBox} from 'framer-motion'
import { RefObject } from 'react'

interface Props {
    type:string
    constraint?:Partial<BoundingBox> | RefObject<Element> | false
}

export const Item = ({type, constraint=false}:Props) => {
    return <motion.div drag dragConstraints={constraint}>{type}</motion.div>
}