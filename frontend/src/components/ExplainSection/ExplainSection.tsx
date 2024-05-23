"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Editor from "@monaco-editor/react"
import { useTheme } from "next-themes"
import ReactMarkdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import rehypeRaw from "rehype-raw"
import rehypeSanitize from "rehype-sanitize"
import remarkGfm from "remark-gfm"
import CustomTabsContent from "./CustomTabsContent"

const markdown = `
<div align="center"><a name="readme-top"></a>

[![][image-banner]][deployment-link]

<br/>

# SyArGPT

An AI Application that generates diagram from user system requirements

</div>

## 👋🏻 Getting Started

### Requirements 

- Generate System Architecture from User requirements
- Follow AWS Well Architecture
- Can export result to **drawio** or **Mermaid** 
- Support **justification/explanation** where user can add more input from first result 
- Leverage the power of generative AI and 
    - open knowledge on Internet (for example: architecture blueprint shared by AWS, etc.)
    - on Intranet 
- The design output must consider the security, maintainability, scalability,...

## ✨ Features

### "1" Generate diagram from prompt
### "2" Justify result from system
### "3" Export result to draw.io or mermaid format
### "4" Generate explanation/document for diagram
### "5" Generate code templates based on design
### "6" Import document
### "1" Generate diagram from prompt
### "2" Justify result from system
### "3" Export result to draw.io or mermaid format
### "4" Generate explanation/document for diagram
### "5" Generate code templates based on design
### "6" Import document
### "1" Generate diagram from prompt
### "2" Justify result from system
### "3" Export result to draw.io or mermaid format
### "4" Generate explanation/document for diagram
### "5" Generate code templates based on design
### "6" Import document
### "1" Generate diagram from prompt
### "2" Justify result from system
### "3" Export result to draw.io or mermaid format
### "4" Generate explanation/document for diagram
### "5" Generate code templates based on design
### "6" Import document


## ⌨️ Development

### Component Architect
[![][component-arch]][deployment-link]

TODO


[image-banner]: https://github.com/buisihung11/SyArGPT/blob/main/assets/banner.png?raw=true
[component-arch]: https://github.com/buisihung11/SyArGPT/blob/main/assets/ComponentArchitect.png?raw=true
[deployment-link]: https://github.com/buisihung11/SyArGPT
`

const ExplainSection = () => {
  const { theme } = useTheme()
  const editorTheme = theme === "light" ? "light" : "vs-dark"

  return (
    <Tabs defaultValue="explain" className="h-full relative flex flex-col p-4">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="explain">Explain</TabsTrigger>
        <TabsTrigger value="password">Code</TabsTrigger>
        <TabsTrigger value="cost">Cost</TabsTrigger>
      </TabsList>
      <CustomTabsContent value="explain">
        <ReactMarkdown
          rehypePlugins={[rehypeHighlight, rehypeRaw, rehypeSanitize]}
          remarkPlugins={[remarkGfm]}
        >
          {markdown}
        </ReactMarkdown>
      </CustomTabsContent>
      <CustomTabsContent value="password">
        <Editor
          height="80vh"
          defaultLanguage="python"
          defaultValue="// some comment"
          theme={editorTheme}
        />
      </CustomTabsContent>
      <CustomTabsContent value="cost">
        <Editor
          height="80vh"
          defaultLanguage="python"
          defaultValue="// some comment"
          theme={editorTheme}
        />
      </CustomTabsContent>
    </Tabs>
  )
}

export default ExplainSection
