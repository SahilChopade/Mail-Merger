import React from "react"
import { motion } from "framer-motion"
import DownArrowIcon from "../Assets/DownArrowIcon"

const DownArrowAnimation = () => {
  const arrowVariants = {
    hidden: { scale: 1 },
    visible: (i) => ({
      scale: 1.5,
      transition: {
        duration: 0.5,
        delay: i * 0.2, // Delays each arrow progressively
        repeat: Infinity,
        repeatType: "reverse",
      },
    }),
  }

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col gap-4">
        {[1, 2, 3].map((index) => (
          <motion.div className="flex items-center justify-center w-fit h-fit" key={index} custom={index} initial="hidden" animate="visible" variants={arrowVariants}>
            <DownArrowIcon className="w-10" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default DownArrowAnimation
