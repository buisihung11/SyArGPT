import {
  Tooltip,
  TooltipTrigger,
  TooltipContent
} from "@/components/ui/tooltip"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { History } from "@/stores"
import HistoryImage from "./HistoryImage"
import { FC } from "react"

export type HistoryItemProps = {
  history: History
  onClick: () => void
  idx: number
}

const HistoryItem: FC<HistoryItemProps> = ({ history, onClick, idx }) => {
  return (
    <Tooltip>
      <Card onClick={onClick} className=" w-36 h-24 relative">
        <Badge
          className="absolute bottom-1 left-1 z-50 flex h-6 w-8 items-center justify-center rounded-sm border px-2 font-mono text-xs leading-none"
          variant="secondary"
        >
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
            {history.prompt}
          </p>
          <p className="text-gray-400 text-xs">2 hours ago</p>
        </TooltipContent>
      </Card>
    </Tooltip>
  )
}

export default HistoryItem
