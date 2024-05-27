"use client"

import { generateTerraformCode } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  AppSlice,
  History,
  HistorySlice,
  useAppStore,
  useChatStore,
  useHistoryStore,
  useTerraformStore
} from "@/stores"
import { AppResponse, Cost } from "@/types"
import { CornerDownLeft, Loader2 } from "lucide-react"
import { useEffect } from "react"
import { v4 } from "uuid"
import { useToast } from "../ui/use-toast"

const ChatControl = () => {
  const { toast } = useToast()

  const onInputPrompt = useChatStore(state => state.onInputPrompt)
  const prompt = useChatStore(state => state.prompt)
  const sessionID = useAppStore(state => state.sessionId)
  const setSessionID = useAppStore(state => state.setSessionId)

  const {
    setCostResult,
    setIsCostLoading,
    isExplainCodeImageLoading,
    setExplainResult,
    setCodeResult,
    setImageResult,
    setIsExplainCodeImageLoading
  } = useAppStore((state: AppSlice) => state)

  const { history, setHistory } = useHistoryStore(
    (state: HistorySlice) => state
  )

  const terraformResult = useTerraformStore(state => state.result)
  const setLogs = useTerraformStore(state => state.setLogs)
  const setTerraformLoading = useTerraformStore(state => state.setIsLoading)
  const setTerraformResult = useTerraformStore(state => state.setCode)
  const cleanLogs = useTerraformStore(state => state.cleanLogs)

  useEffect(() => {
    setSessionID(v4())
  }, [setSessionID])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
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

      cleanLogs()
      setTerraformLoading(true)
      setCostResult(null)
      setIsCostLoading(true)

      const {
        explain: explainResult,
        codeBlock: codeResult,
        imageURL: imageResult
      } = await fetchAppData({
        prompt,
        currentSessionId: sessionID!
      })

      const [{ costResult }, { terraformResult }] = await Promise.all([
        fetchCost(explainResult),
        fetchTerraform(explainResult)
      ])

      const newHistory: History[] = [
        ...history,
        {
          id: v4(),
          prompt,
          imageResult,
          explainResult,
          codeResult,
          costResult,
          terraformResult
        }
      ]

      setHistory(newHistory)
    } catch (e) {
      toast({
        title: "error",
        description: (e as Error).message,
        variant: "destructive"
      })
    }
  }

  const fetchAppData = async ({
    prompt,
    currentSessionId
  }: {
    prompt: string
    currentSessionId: string
  }): Promise<AppResponse> => {
    try {
      setIsExplainCodeImageLoading(true)

      const url = `/api/appData`
      const method = "POST"

      const res = await fetch(url, {
        method,
        headers: {
          Accept: "application/json"
        },
        body: JSON.stringify({
          session_id: currentSessionId,
          message: prompt
        })
      })

      const resJSON: AppResponse = await res.json()

      const { codeBlock, explain, imageURL } = resJSON

      setCodeResult(codeBlock)
      setExplainResult(explain)
      setImageResult(imageURL)

      return resJSON
    } catch (error) {
      throw error
    } finally {
      setIsExplainCodeImageLoading(false)
    }
  }

  const fetchCost = async (prompt: string): Promise<{ costResult: Cost }> => {
    try {
      setIsCostLoading(true)

      const url = `/api/cost`
      const method = "POST"

      const res = await fetch(url, {
        method,
        headers: {
          Accept: "application/json"
        },
        body: JSON.stringify({
          message: prompt
        })
      })

      const resJSON: Cost = await res.json()

      setCostResult(resJSON)
      return { costResult: resJSON }
    } catch (error) {
      throw error
    } finally {
      setIsCostLoading(false)
    }
  }

  const fetchTerraform = async (
    prompt: string
  ): Promise<{ terraformResult: any }> => {
    setTerraformLoading(true)
    setLogs([])
    const data = await generateTerraformCode({ diagramCode: prompt })
    setTerraformResult(data)
    console.log("terraformData", data)
    setTerraformLoading(false)

    const requestData = {
      sessionId: sessionID,
      files: data.files.map((f: any) => ({
        fileName: f.name,
        fileContent: f.content
      }))
    }

    return {
      terraformResult: data
    }

    // call to POST localhost:80/update to test the terraform code
    // Wait until deploy the backend
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
            disabled={isExplainCodeImageLoading}
            type="submit"
            size="sm"
            className="ml-auto gap-1.5 w-full cursor-pointer"
          >
            Send Message
            {isExplainCodeImageLoading ? (
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
