"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useBoundStore } from "@/stores/useBoundStore"
import { CornerDownLeft } from "lucide-react"
import { useChat } from "ai/react"
import { useState } from "react"
import { useToast } from "../ui/use-toast"

const ChatControl = () => {
  const { toast } = useToast()

  const onInputPrompt = useBoundStore(state => state.onInputPrompt)
  const prompt = useBoundStore(state => state.prompt)
  const onConversation = useBoundStore(state => state.onConversation)

  const [sourcesForMessages, setSourcesForMessages] = useState<
    Record<string, any>
  >({})

  const {
    messages,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    isLoading: chatEndpointIsLoading,
    setMessages
  } = useChat({
    api: "/api/chat",
    onResponse(response) {
      const sourcesHeader = response.headers.get("x-sources")
      const sources = sourcesHeader
        ? JSON.parse(Buffer.from(sourcesHeader, "base64").toString("utf8"))
        : []
      const messageIndexHeader = response.headers.get("x-message-index")
      if (sources.length && messageIndexHeader !== null) {
        setSourcesForMessages({
          ...sourcesForMessages,
          [messageIndexHeader]: sources
        })
      }
    },
    onError: e => {
      console.log(e)
      toast({
        title: e.message
      })
    }
  })

  return (
    <div
      className="flex flex-col h-full gap-4 rounded-lg bg-background"
      x-chunk="dashboard-03-chunk-1"
    >
      <form onSubmit={handleSubmit}>
        <div className="p-4 flex-1">
          <h4 className="scroll-m-20 text-sm font-semibold tracking-tight mb-2">
            Describe your prompt
          </h4>
          <Label htmlFor="message" className="sr-only">
            Message
          </Label>
          <Textarea
            // value={prompt}
            value={input}
            id="message"
            placeholder="Type your requirements here..."
            className="resize-none h-full border p-3 focus-visible:ring-0 shadow-none flex-1"
            // onChange={e => onInputPrompt(e.target.value)}
            onChange={handleInputChange}
          />
          <div>
            Output
            {messages.length > 0
              ? [...messages].reverse().map((m, i) => {
                  const sourceKey = (messages.length - 1 - i).toString()
                  return (
                    <div key={m.id}>
                      {m.role}: {m.content}
                    </div>
                  )
                })
              : ""}
          </div>
        </div>

        <div className="p-4 w-full">
          <Button type="submit" size="sm" className="ml-auto gap-1.5 w-full">
            Send Message
            <CornerDownLeft className="size-3.5" />
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ChatControl
