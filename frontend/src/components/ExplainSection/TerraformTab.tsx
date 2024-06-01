"use client"

import { Editor } from "@monaco-editor/react"
import { useTheme } from "next-themes"
import { LazyLog } from "@melloware/react-logviewer"
import { useEffect, useState } from "react"
import { useChatStore, useTerraformStore } from "@/stores"
import { Button } from "../ui/button"
import { Orbit } from "lucide-react"
import { v4 } from "uuid"
import { useToast } from "../ui/use-toast"
import { Skeleton } from "../ui/skeleton"

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/lkDvafYpS9F
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
export default function TerraformTab() {
  const { toast } = useToast()
  const [isLoadingLog, setIsLoadingLog] = useState(false)

  const isLoading = useTerraformStore(state => state.isLoading)
  const codeTemplates = useTerraformStore(state => state.result)
  const logs = useTerraformStore(state => state.logs)
  const prompt = useChatStore(state => state.prompt)
  const setLogs = useTerraformStore(state => state.setLogs)

  const [selectedFile, setSelectedFile] = useState<string | null>(null)

  const { theme } = useTheme()
  const editorTheme = theme === "light" ? "light" : "vs-dark"

  useEffect(() => {
    if (codeTemplates.files.length === 0) return
    setSelectedFile(codeTemplates.files[0].name)
  }, [codeTemplates.files])

  if (isLoading) {
    return <TerraformTabSkeleton />
  }

  if (codeTemplates?.files?.length === 0) {
    return <div className="flex flex-col gap-4">No code templates found.</div>
  }

  const handleRunPlan = async () => {
    const requestData = {
      sessionId: v4(),
      files: codeTemplates.files.map((f: any) => ({
        fileName: f.name,
        fileContent: f.content
      })),
      prompt
    }
    setLogs([])
    await checkTerraform(requestData)
  }

  const checkTerraform = async (requestData: any) => {
    setIsLoadingLog(true)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_TERRAFORM_CHECL_URL}/upload`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(requestData)
        }
      )

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
          console.log("logEntries", logEntries)
          setLogs([...logEntries])
        }

        setIsLoadingLog(false)
      }

      await readStream()
    } catch (error) {
      toast({
        title: "Error",
        description: "Error uploading files",
        variant: "destructive"
      })
      console.error("Error uploading files:", error)
      setIsLoadingLog(false)
    }
  }

  const checkTerraformSync = async (requestData: any) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_TERRAFORM_CHECL_URL}/upload`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(requestData)
        }
      ).then(res => res.json())
      console.log("response", response)
      setLogs([response])
    } catch (error) {
      console.error("Error uploading files:", error)
    } finally {
    }
  }

  return (
    <div className="flex flex-col gap-4 w-full h-full overflow-hidden">
      <div className="w-full h-[48px] flex flex-row border-b flex-none">
        <div className="flex flex-row -ml-4 items-end gap-2 overflow-x-auto px-4 ">
          {codeTemplates.files.map(f => (
            <button
              key={f.name}
              onClick={() => setSelectedFile(f.name)}
              className={`font-regular relative h-full whitespace-nowrap rounded-t-lg border border-b-0 px-3 pb-1 pt-1.5 text-[13px] transition-colors bg-background 
            ${selectedFile !== f.name ? "opacity-50" : ""} 
            `}
            >
              <div className="absolute bottom-0 right-[-5px] z-20 h-[5px] w-[5px] rounded-bl-[4px] border-b border-l bg-gray-50 dark:bg-background"></div>
              <div className="absolute bottom-0 right-[-5px] z-10 h-[5px] w-[5px] bg-white dark:bg-background"></div>
              {f.name}
              <div className="absolute bottom-0 left-[-5px] z-20 h-[5px] w-[5px] rounded-br-[4px] border-b border-r bg-gray-50 dark:bg-background"></div>
              <div className="absolute bottom-0 left-[-5px] z-10 h-[5px] w-[5px] bg-white"></div>
            </button>
          ))}
        </div>
        <Button
          disabled={isLoadingLog}
          onClick={handleRunPlan}
          variant="outline"
          size="sm"
          className="ml-auto gap-1.5 text-sm"
        >
          <Orbit className={` h-4 w-4 ${isLoadingLog ? "animate-spin" : ""}`} />
          Run Plan
        </Button>
      </div>
      <div className="flex-1 p-2 flex flex-col gap-2 w-full max-h-full overflow-y-scroll">
        <div key={selectedFile} className="rounded-lg mx-auto w-full h-full">
          <Editor
            className="rounded-lg"
            language="hcl"
            height="100%"
            defaultValue={
              codeTemplates.files.find(f => f.name === selectedFile)?.content
            }
            theme={editorTheme}
            options={{
              readOnly: false,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              wordWrap: "on"
            }}
          />
        </div>
      </div>

      {!!logs.length ? (
        <div className="flex-none h-[400px] w-full">
          <h3 className="text-md">Logs:</h3>
          <LazyLog
            follow
            caseInsensitive
            extraLines={1}
            enableSearch={false}
            selectableLines
            lineClassName="text-xs"
            text={logs.map(l => l.log ?? l.error).join("\n")}
          />
        </div>
      ) : null}
    </div>
  )
}

const TerraformTabSkeleton = () => {
  return (
    <div className="flex h-[50vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <p className="text-gray-500 dark:text-gray-400">
          Generating results...
        </p>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[120px]" />
          </div>
        </div>
      </div>
    </div>
  )
}
