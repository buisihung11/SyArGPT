"use client"

import { AppSlice, useAppStore } from "@/stores"

import { useState } from "react"
import HistorySection from "../HistorySection"
import ErrorResult from "./ErrorResult"
import ImageResult from "./ImageResult"

const ResultSection = () => {
  const { imageResult, codeResult } = useAppStore((state: AppSlice) => state)

  const [isLoadImageError, setIsLoadImageError] = useState(false)

  if ((!imageResult && codeResult) || isLoadImageError) {
    return <ErrorResult />
  }

  // TODO: Handle when image is null

  return (
    <div className="relative flex flex-col h-full min-h-[50vh]">
      <ImageResult
        imageResult={imageResult}
        setIsLoadImageError={setIsLoadImageError}
      />
      <div className="h-48 min-h-36 justify-self-end">
        <HistorySection />
      </div>
    </div>
  )
}

export default ResultSection
