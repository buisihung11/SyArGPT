"use client"

import { TerraformResult } from "@/stores/terraformSlice"
import { useTerraformStore } from "@/stores/useBoundStore"
import { Editor } from "@monaco-editor/react"
import { useTheme } from "next-themes"
import { LazyLog } from "@melloware/react-logviewer"

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/lkDvafYpS9F
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
export default function TerraformTab() {
  const isLoading = useTerraformStore(state => state.isLoading)
  const codeTemplates = useTerraformStore(state => state.result)
  const logs = useTerraformStore(state => state.logs)

  const { theme } = useTheme()
  const editorTheme = theme === "light" ? "light" : "vs-dark"

  if (isLoading) {
    return <TerraformTabSkeleton />
  }

  if (codeTemplates.files.length === 0) {
    return <div className="flex flex-col gap-4">No code templates found.</div>
  }

  return (
    <div className=" flex flex-col gap-4 w-full p-2 h-full">
      <div className="flex-1 flex flex-col gap-2 w-full h-full">
        {codeTemplates.files.map(file => (
          <div key={file.name} className="rounded-lg shadow-md mx-auto w-full">
            <h1 className="text-2xl font-bold mb-4">{file.name}</h1>
            <Editor
              className="rounded-lg"
              height="50vh"
              language="hcl"
              defaultValue={file.content}
              theme={editorTheme}
              options={{
                readOnly: false,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                wordWrap: "on"
              }}
            />
          </div>
        ))}
      </div>

      <div className="h-[400px]">
        <h3>Logs:</h3>
        <LazyLog
          follow
          caseInsensitive
          extraLines={1}
          enableSearch={false}
          selectableLines
          lineClassName="text-sm"
          text={logs.map(l => l.log).join("\n")}
        />
      </div>
    </div>
  )
}

const TerraformTabSkeleton = () => {
  return <div className=" flex flex-col gap-4">Loading...</div>
}
