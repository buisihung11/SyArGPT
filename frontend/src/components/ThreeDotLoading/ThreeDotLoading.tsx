import React from "react"
import { motion } from "framer-motion"

export const ThreeDotsWave = () => {
  return (
    <motion.div
      className="w-[2rem] h-[2rem] flex justify-around"
      variants={{
        start: {
          transition: {
            staggerChildren: 0.2
          }
        },
        end: {
          transition: {
            staggerChildren: 0.2
          }
        }
      }}
      initial="start"
      animate="end"
    >
      <Dot />
      <Dot />
      <Dot />
    </motion.div>
  )
}

const Dot = () => {
  return (
    <motion.span
      className="block w-[0.5rem] h-[0.5rem] dark:bg-white bg-black rounded"
      variants={{
        start: {
          y: "50%"
        },
        end: {
          y: "150%"
        }
      }}
      transition={{
        duration: 0.5,
        repeatType: "mirror",
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  )
}
