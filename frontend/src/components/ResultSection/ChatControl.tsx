"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useBoundStore } from "@/stores/useBoundStore"
import { CornerDownLeft } from "lucide-react"

const ChatControl = () => {
  const onInputPrompt = useBoundStore(state => state.onInputPrompt)
  const prompt = useBoundStore(state => state.prompt)
  const onConversation = useBoundStore(state => state.onConversation)

  return (
    <div
      className="flex flex-col h-full gap-4 rounded-lg bg-background"
      x-chunk="dashboard-03-chunk-1"
    >
      <div className="p-4 flex-1">
        <h4 className="scroll-m-20 text-sm font-semibold tracking-tight mb-2">
          Describe your prompt
        </h4>
        <Label htmlFor="message" className="sr-only">
          Message
        </Label>
        <Textarea
          value={prompt}
          id="message"
          placeholder="Type your message here..."
          className="resize-none h-full border p-3 focus-visible:ring-0 shadow-none flex-1"
          onChange={e => onInputPrompt(e.target.value)}
        />
      </div>

      <div className="p-4 w-full">
        <Button
          onClick={() => {
            onConversation({
              role: "user",
              content: prompt
            })
          }}
          type="submit"
          size="sm"
          className="ml-auto gap-1.5 w-full"
        >
          Send Message
          <CornerDownLeft className="size-3.5" />
        </Button>
      </div>
    </div>
  )
}

export default ChatControl
