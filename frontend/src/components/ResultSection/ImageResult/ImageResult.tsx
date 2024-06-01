import { useState } from "react"

import { motion } from "framer-motion"
import { File } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { AppSlice, useAppStore } from "@/stores"
import ImageLoading from "@/components/ImageLoading"

import { buttonVariants } from "../../ui/button"
import ErrorImageResult from "./ErrorImageResult"
import ImageInitScreen from "./ImageInitScreen"

const MotionImg = motion(Image)

const ImageResult = () => {
  const { imageResult, codeResult, isDiagramGenerating: isExplainCodeImageLoading } = useAppStore(
    (state: AppSlice) => state
  )
  const [viewMode, setViewMode] = useState<"image" | "edit">("image")
  const [isLoadImageError, setIsLoadImageError] = useState(false)

  if (isExplainCodeImageLoading) {
    return <ImageLoading />
  }

  if ((!imageResult && codeResult) || isLoadImageError) {
    return <ErrorImageResult />
  }

  // When prompt return no image, imageResult is assigned as null from downstream
  // TODO: if(imageResult === null)

  // When app init, The imageResult is assigned as undefined
  if (!imageResult) {
    return <ImageInitScreen />
  }

  return (
    <div
      className={`flex-1 p-4 flex flex-col gap-2 h-full items-center w-full justify-center ${
        viewMode !== "image" && "hidden"
      }`}
    >
      <div className="bg-muted shadow-md w-full h-full max-w-[800px] mx-auto relative">
        <Image
          onError={() => {
            setIsLoadImageError(true)
          }}
          src={imageResult}
          alt="Cloud Architecture Diagram"
          fill
          objectFit="contain"
          className="rounded-md object-cover cursor-pointer"
        />
      </div>
      <Link
        className={buttonVariants({ variant: "outline" })}
        href={imageResult}
        download={true}
      >
        <File className="mr-2 h-4 w-4" /> Export
      </Link>
    </div>
  )
}

export default ImageResult
