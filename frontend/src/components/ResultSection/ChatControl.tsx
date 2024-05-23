"use client"

import { costEstimate } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useBoundStore } from "@/stores/useBoundStore"
import { CornerDownLeft, Loader2 } from "lucide-react"
import { useToast } from "../ui/use-toast"

const ChatControl = () => {
  const { toast } = useToast()

  const onInputPrompt = useBoundStore(state => state.onInputPrompt)
  const prompt = useBoundStore(state => state.prompt)
  const onConversation = useBoundStore(state => state.onConversation)
  const { setCostResult, setIsCostLoading, isLoading } = useBoundStore(
    state => state
  )

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const input = prompt
    if (!input) {
      toast({
        title: "No prompt",
        description: "Please enter a prompt to continue.",
        variant: "destructive"
      })
      return
    }

    const messages = await onConversation({
      role: "user",
      content: input
    })

    // TODO: Call API to generate the diagram + explanation
    fetchCost()
    // TODO: Use the generated diagram to trigger terraform generation
  }

  const fetchCost = async () => {
    setIsCostLoading(true)
    const data = await costEstimate({ input: prompt })
    toast({
      title: "Cost Estimate",
      description: JSON.stringify(data, null, 2)
    })
    console.log("data", data)
    setCostResult(data)
    setIsCostLoading(false)
  }

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
            value={prompt}
            id="message"
            placeholder="Type your requirements here..."
            className="resize-none h-full border p-3 focus-visible:ring-0 shadow-none flex-1"
            onChange={e => onInputPrompt(e.target.value)}
          />
        </div>

        <div className="p-4 w-full">
          <Button
            disabled={isLoading}
            type="submit"
            size="sm"
            className="ml-auto gap-1.5 w-full cursor-pointer"
          >
            Send Message
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <CornerDownLeft className="size-3.5" />
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ChatControl
