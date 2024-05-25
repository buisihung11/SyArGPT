"use client"

import { TerraformResult } from "@/stores/terraformSlice"
import { useTerraformStore } from "@/stores/useBoundStore"
import { Editor } from "@monaco-editor/react"
import { useTheme } from "next-themes"
import { LazyLog } from "@melloware/react-logviewer"
import { useEffect, useState } from "react"

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/lkDvafYpS9F
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
export default function TerraformTab() {
  const isLoading = useTerraformStore(state => state.isLoading)
  const codeTemplates = useTerraformStore(state => state.result)
  const logs = useTerraformStore(state => state.logs)

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

  if (codeTemplates.files.length === 0) {
    return <div className="flex flex-col gap-4">No code templates found.</div>
  }

  return (
    <div className="flex flex-col gap-4 w-full h-full overflow-hidden">
      <div className="flex flex-row -ml-4 items-end gap-2 overflow-x-auto px-4 border-b">
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
      <div className="flex-1 p-2 flex flex-col gap-2 w-full max-h-full overflow-y-scroll">
        <div key={selectedFile} className="rounded-lgmx-auto w-full">
          <Editor
            className="rounded-lg"
            height="40vh"
            language="hcl"
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
            text={logs.map(l => l.log).join("\n")}
          />
        </div>
      ): null}
    </div>
  )
}

const TerraformTabSkeleton = () => {
  return <div className=" flex flex-col gap-4">Loading...</div>
}
