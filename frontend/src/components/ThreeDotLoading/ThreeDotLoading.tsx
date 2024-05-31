import React, { FC } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type ThreeDotsLoadingType = {
  className?: string
}
export const ThreeDotsLoading: FC<ThreeDotsLoadingType> = ({ className }) => {
  return (
    <motion.div
      className={cn(
        "w-[1rem] h-[1rem] flex items-center justify-around",
        className
      )}
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
      className="block w-[0.2rem] h-[0.2rem] dark:bg-white bg-black rounded"
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
