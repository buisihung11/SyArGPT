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
import {
  TooltipProvider
} from "../ui/tooltip"
import HistoryItem from "./HistoryItem"

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


export default HistorySection
