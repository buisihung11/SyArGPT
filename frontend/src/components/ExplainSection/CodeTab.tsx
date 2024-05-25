import Editor from "@monaco-editor/react"
import { useTheme } from "next-themes"
import { FC } from "react"

type CodeTabType = {
  editorText?: string
  isCodeTabLoading: boolean
}

const CodeTab: FC<CodeTabType> = ({ editorText, isCodeTabLoading }) => {
  const { theme } = useTheme()
  const editorTheme = theme === "light" ? "light" : "vs-dark"

  if (isCodeTabLoading) {
    return <h1>Loading...</h1>
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
    />
  )
}

export default CodeTab
