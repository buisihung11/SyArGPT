"use client"

import { costEstimate, generateTerraformCode } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAppStore, useChatStore, useTerraformStore } from "@/stores"
import { CornerDownLeft, Loader2 } from "lucide-react"
import { useToast } from "../ui/use-toast"

const ChatControl = () => {
  const { toast } = useToast()

  const onInputPrompt = useChatStore(state => state.onInputPrompt)
  const prompt = useChatStore(state => state.prompt)
  const onConversation = useChatStore(state => state.onConversation)
  const { setCostResult, setIsCostLoading, isLoading } = useAppStore(
    state => state
  )
  const setLogs = useTerraformStore(state => state.setLogs)

  const setTerraformLoading = useTerraformStore(state => state.setIsLoading)
  const setTerraformResult = useTerraformStore(state => state.setCode)

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
    fetchTerraform()
  }

  const fetchCost = async () => {
    setIsCostLoading(true)
    const data = await costEstimate({ input: prompt })
    console.log("data", data)
    setCostResult(data)
    setIsCostLoading(false)
  }

  const fetchTerraform = async () => {
    setTerraformLoading(true)
    setLogs([])
    const data = await generateTerraformCode({ diagramCode: prompt })
    setTerraformResult(data)
    console.log("terraformData", data)
    setTerraformLoading(false)

    const requestData = {
      sessionId: "123",
      files: data.files.map((f: any) => ({
        fileName: f.name,
        fileContent: f.content
      }))
    }

    // call to POST localhost:80/update to test the terraform code
    // checkTerraform(requestData) Wait until deploy the backend
  }

  const checkTerraform = async (requestData: any) => {
    try {
      const response = await fetch("http://localhost:80/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
      })

      if (!response.body) {
        console.error("ReadableStream not yet supported in this browser.")
        return
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      const readStream = async () => {
        let result
        while (!(result = await reader.read()).done) {
          const chunk = decoder.decode(result.value, { stream: true })
          const logEntries = chunk
            .split("\n")
            .filter(line => line)
            .map(line => JSON.parse(line))
          setLogs([...logEntries])
        }
      }

      readStream()
    } catch (error) {
      console.error("Error uploading files:", error)
    }
  }

  return (
    <div
      className="rounded-lg bg-background h-full"
      x-chunk="dashboard-03-chunk-1"
    >
      <form className="flex flex-col h-full gap-4 " onSubmit={handleSubmit}>
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
