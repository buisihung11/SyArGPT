import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { CornerDownLeft, Mic, Paperclip } from "lucide-react"

const ChatControl = () => {
  return (
    <div
      className="flex flex-col relativeoverflow-hidden rounded-lg bg-background"
      x-chunk="dashboard-03-chunk-1"
    >
      <div className="p-4">
        <h4 className="scroll-m-20 text-lg font-semibold tracking-tight mb-2">Describe your prompt</h4>
        <Label htmlFor="message" className="sr-only">
          Message
        </Label>
        <Textarea
          id="message"
          placeholder="Type your message here..."
          className="resize-none min-h-60 h-full border p-3 focus-visible:ring-0 shadow-none flex-1"
        />
      </div>

      <div className="p-4 w-full">
        <Button type="submit" size="sm" className="ml-auto gap-1.5 w-full">
          Send Message
          <CornerDownLeft className="size-3.5" />
        </Button>
      </div>
    </div>
  )
}

export default ChatControl
