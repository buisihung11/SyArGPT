import { Skeleton } from "@/components/ui/skeleton"
import Editor from "@monaco-editor/react"
import { useTheme } from "next-themes"
import { FC, useEffect, useRef } from "react"

type CodeTabType = {
  editorText?: string
  isGenerating?: boolean
}

const CodeTab: FC<CodeTabType> = ({ editorText, isGenerating }) => {
  const { theme } = useTheme()
  const editorTheme = theme === "light" ? "light" : "vs-dark"
  const editorRef = useRef<any>(null)


  useEffect(() => {
    editorRef.current?.setValue(editorText)
  }, [editorText])

  if (isGenerating && !editorText) {
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

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor
  }

  if (!editorText) {
    return <h1>No code found</h1>
  }

  return (
    <Editor
      height="80vh"
      defaultLanguage="python"
      defaultValue={editorText}
      theme={editorTheme}
      onMount={handleEditorDidMount}
    />
  )
}

export default CodeTab
