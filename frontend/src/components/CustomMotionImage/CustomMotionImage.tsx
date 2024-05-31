import { motion } from "framer-motion"
import Image, { ImageProps } from "next/image"
import { FC, useState } from "react"

const MotionImage = motion(Image)

type CustomMotionImageType = ImageProps & {
  className?: string
  initialHeight: string
  src: string
  alt: string
}

const CustomMotionImage: FC<CustomMotionImageType> = ({
  className,
  initialHeight,
  src,
  alt,
  ...props
}) => {
  const [imageLoading, setImageLoading] = useState(true)

  return (
    <motion.div
      initial={{ height: initialHeight, opacity: 0 }}
      animate={{
        opacity: [0, 0.3, 1],
        height: imageLoading ? initialHeight : "auto"
      }}
      transition={{
        duration: 1.4,
        ease: [0.4, 0, 0.6, 1],
        height: { delay: 0, duration: 0.4 },
        opacity: { delay: 0.5, duration: 0.4 }
      }}
    >
      <Image
        className={className}
        onLoad={() => setImageLoading(false)}
        src={src}
        alt={alt}
        {...props}
      />
    </motion.div>
  )
}

export default CustomMotionImage
