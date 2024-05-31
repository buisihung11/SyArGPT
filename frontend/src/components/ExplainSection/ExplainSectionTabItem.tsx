import React, { FC } from "react"
import { ThreeDotsLoading } from "../ThreeDotLoading"

type ExplainSectionTabItemType = {
  isLoading: boolean
  content: string
}

const ExplainSectionTabItem: FC<ExplainSectionTabItemType> = ({
  isLoading,
  content
}) => {
  return (
    <div className="flex items-center justify-center gap-2 w-full">
      {isLoading && <ThreeDotsLoading />}
      <span className="overflow-hidden text-ellipsis whitespace-nowrap ">
        {content}
      </span>
    </div>
  )
}

export default ExplainSectionTabItem
