import Editor from "@monaco-editor/react"
import { useTheme } from "next-themes"
import { FC } from "react"

const CodeTab: FC<{ editorText?: string }> = ({ editorText }) => {
  const { theme } = useTheme()
  const editorTheme = theme === "light" ? "light" : "vs-dark"

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
