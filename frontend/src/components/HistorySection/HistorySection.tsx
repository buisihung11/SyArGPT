"use client"

import {
  AppSlice,
  ChatSlice,
  History,
  HistorySlice,
  TerraformSlice,
  useAppStore,
  useChatStore,
  useHistoryStore,
  useTerraformStore
} from "@/stores"
import Image from "next/image"
import { Badge } from "../ui/badge"
import { Card, CardContent } from "../ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "../ui/tooltip"

const HistorySection = () => {
  const { history } = useHistoryStore((state: HistorySlice) => state)
  const { setExplainResult, setCodeResult, setCostResult, setImageResult } =
    useAppStore((state: AppSlice) => state)
  const { onInputPrompt } = useChatStore((state: ChatSlice) => state)
  const { setCode } = useTerraformStore((state: TerraformSlice) => state)

  const handleHistoryItemClick = (history: History): void => {
    const {
      prompt,
      imageResult,
      explainResult,
      codeResult,
      costResult,
      terraformResult
    } = history

    setExplainResult(explainResult)
    setCodeResult(codeResult)
    setCostResult(costResult)
    setImageResult(imageResult)
    onInputPrompt(prompt)
    setCode(terraformResult || { files: [] })
  }

  return (
    <TooltipProvider>
      <div className="h-full flex flex-col p-4 gap-4 bg-background border-t-2">
        <h1 className="text-xl font-semibold">History</h1>
        {history.length > 0 ? (
          <div className="flex gap-4 flex-row w-full overflow-auto">
            {history.map((history, idx) => (
              <HistoryItem
                key={history.id}
                history={history}
                idx={idx}
                onClick={() => handleHistoryItemClick(history)}
              />
            ))}
          </div>
        ) : (
          <p>No history recorded</p>
        )}
      </div>
    </TooltipProvider>
  )
}

const HistoryItem = ({
  history,
  onClick,
  idx
}: {
  history: History
  onClick: () => void
  idx: number
}) => {
  return (
    <Tooltip>
      <Card onClick={onClick} className=" w-36 h-24 relative">
        <Badge className="absolute  bottom-1 left-1 z-50 flex h-6 w-8 items-center justify-center rounded-sm border px-2 font-mono text-xs leading-none" variant="secondary">
          v{idx}
        </Badge>
        <TooltipTrigger asChild>
          <CardContent className="flex aspect-square items-center justify-center p-1 text-center w-full h-full relative bg-muted">
            <HistoryImage history={history} />
          </CardContent>
        </TooltipTrigger>

        <TooltipContent className=" w-72 h-58 p-2">
          <div className="w-full h-32 relative">
            <HistoryImage history={history} />
          </div>
          <p className="line-clamp-5 text-sm font-semibold mb-2">
            Prompt {history.prompt}
          </p>
          <p className="text-gray-400 text-xs">2 hours ago</p>
        </TooltipContent>
      </Card>
    </Tooltip>
  )
}

const HistoryImage = ({ history }: { history: History }) => {
  return history.imageResult ? (
    <Image
      fill
      objectFit="cover"
      src={history.imageResult}
      alt="test"
      className="p-2 rounded-md object-cover cursor-pointer"
    />
  ) : (
    <Image
      fill
      objectFit="contain"
      src="/asset/noImgErr.webp"
      alt="No Image found"
    />
  )
}

export default HistorySection
