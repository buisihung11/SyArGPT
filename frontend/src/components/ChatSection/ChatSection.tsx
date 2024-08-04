"use client"

import { useCompletion, experimental_useObject as useObject } from "ai/react"

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
import { AppResponse, Cost, ExplanationResponse, diagramSchema } from "@/types"
import { CornerDownLeft, Loader2 } from "lucide-react"
import { useEffect } from "react"
import { v4 } from "uuid"
import { useToast } from "../ui/use-toast"

const ChatSection = () => {
  const { toast } = useToast()

  const onInputPrompt = useChatStore(state => state.onInputPrompt)
  const prompt = useChatStore(state => state.prompt)
  const sessionID = useAppStore(state => state.sessionId)
  const setSessionID = useAppStore(state => state.setSessionId)

  const {
    setCostResult,
    setIsCostLoading,
    isDiagramGenerating: isExplainCodeImageLoading,
    setExplainResult,
    setIsExplanationGenerating,
    setImageResult,
    setIsDiagramGenerating,
  } = useAppStore((state: AppSlice) => state)

  const {
    histories: history,
    setHistories: setHistory,
    updateHistory,
    setCurrentHistory,
    currentHistory
  } = useHistoryStore((state: HistorySlice) => state)

  const terraformResult = useTerraformStore(state => state.result)
  const setLogs = useTerraformStore(state => state.setLogs)
  const setTerraformLoading = useTerraformStore(state => state.setIsLoading)
  const setTerraformResult = useTerraformStore(state => state.setCode)
  const cleanLogs = useTerraformStore(state => state.cleanLogs)

  useEffect(() => {
    setSessionID(v4())
  }, [setSessionID])

  const { completion, complete } = useCompletion({
    api: "/api/explanation",
    onResponse: response => {
      console.log("response", response)
    }
  })

  const { object, submit } = useObject({
    api: "/api/architecture",
    schema: diagramSchema,
    onFinish: ({ object }) => {
      console.log("diagram", object?.diagram)
      setIsDiagramGenerating(false)
    }
  })

  useEffect(() => {
    if (!currentHistory) return
    currentHistory.codeResult = object?.diagram
    console.log("currentHistory", currentHistory.codeResult)
    updateHistory({ ...currentHistory })
  }, [object?.diagram, currentHistory, updateHistory])

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
      setIsDiagramGenerating(true)
      setIsExplanationGenerating(true)
      setIsCostLoading(true)

      setCostResult(null)

      submit(input)

      const newHitory: History = {
        id: v4(),
        prompt,
        imageResult: null,
        explainResult: undefined,
        codeResult: undefined,
        costResult: null,
        terraformResult: null
      }

      const newHistories: History[] = [...history, newHitory]
      setHistory(newHistories)
      setCurrentHistory(newHitory)

      // TODO: Fetch explanation

      // const { explain } = await fetchExplanation({
      //   currentSessionId: sessionID!
      // })

      // updateHistory({
      //   ...newHitory,
      //   explainResult: explain
      // })

      // const [{ costResult }, { terraformResult }] = await Promise.all([
      //   fetchCost(explain),
      //   fetchTerraform(explain)
      // ])

      // const updatedHistory: History = {
      //   ...newHitory,
      //   costResult,
      //   terraformResult
      // }

      // updateHistory(updatedHistory)
    } catch (e) {
      toast({
        title: "error",
        description: (e as Error).message,
        variant: "destructive"
      })
    }
  }

  const fetchExplanation = async ({
    currentSessionId
  }: {
    currentSessionId: string
  }): Promise<ExplanationResponse> => {
    setIsExplanationGenerating(true)
    try {
      const url = `/api/explanation`
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

      const resJSON: ExplanationResponse = await res.json()

      setExplainResult(resJSON.explain)
      return resJSON
    } catch (error) {
      throw error
    } finally {
      setIsExplanationGenerating(false)
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
      setIsDiagramGenerating(true)

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

      const { codeBlock, imageURL } = resJSON

      // setCodeResult(codeBlock)
      setImageResult(imageURL)

      return resJSON
    } catch (error) {
      throw error
    } finally {
      setIsDiagramGenerating(false)
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
    try {
      setTerraformLoading(true)
      setLogs([])
      const data = await generateTerraformCode({ diagramCode: prompt })
      setTerraformResult(data)
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
    } catch (error) {
      toast({
        title: "Error",
        description: "Error uploading files",
        variant: "destructive"
      })
      return {
        terraformResult: {
          files: []
        }
      }
    } finally {
      setTerraformLoading(false)
    }

    // call to POST localhost:80/update to test the terraform code
    // Wait until deploy the backend
  }

  return (
    <div
      className="h-full rounded-lg bg-background"
      x-chunk="dashboard-03-chunk-1"
    >
      <form className="flex h-full flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex-1 p-4">
          <h4 className="mb-2 scroll-m-20 text-sm font-semibold tracking-tight">
            Describe your prompt
          </h4>
          <Label htmlFor="message" className="sr-only">
            Message
          </Label>
          <Textarea
            value={prompt}
            id="message"
            placeholder="Type your requirements here..."
            className="h-full flex-1 resize-none border p-3 shadow-none focus-visible:ring-0"
            onChange={e => onInputPrompt(e.target.value)}
          />
        </div>

        <div className="w-full p-4">
          <Button
            disabled={isExplainCodeImageLoading}
            type="submit"
            size="sm"
            className="ml-auto w-full cursor-pointer gap-1.5"
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

export default ChatSection
