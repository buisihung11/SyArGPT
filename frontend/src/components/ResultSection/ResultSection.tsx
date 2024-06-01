"use client"

import { GridBackgroundDemo } from "../GridBackground/GridBackground"
import HistorySection from "../HistorySection"
import ImageResult from "./ImageResult"

const ResultSection = () => {
  return (
    <div className="relative flex flex-col h-full min-h-[50vh]">
      <div className="h-full">
        <GridBackgroundDemo />
        <ImageResult />
      </div>
      <div className="h-48 min-h-36 justify-self-end bottom-0 w-full">
        <HistorySection />
      </div>
    </div>
  )
}

export default ResultSection
