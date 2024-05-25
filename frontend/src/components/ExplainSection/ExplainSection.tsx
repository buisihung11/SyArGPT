"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { useBoundStore } from "@/stores/useBoundStore"
import CostTab from "./CostTab"
import CustomTabsContent from "./CustomTabsContent"
import ExplainTab from "./ExplainTab"
import CodeTab from "./CodeTab"
import TerraformTab from "./TerraformTab"

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

const editorText = `// some comment`

const ExplainSection = () => {
  const { isLoading, costResult } = useBoundStore(state => state)

  return (
    <Tabs defaultValue="explain" className="h-full relative flex flex-col p-4 max-h-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="explain">Explain</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
        <TabsTrigger value="cost">Cost</TabsTrigger>
        <TabsTrigger value="terraform">Terraform</TabsTrigger>
      </TabsList>

      <CustomTabsContent value="explain">
        <ExplainTab markdown={markdown} />
      </CustomTabsContent>

      <CustomTabsContent value="code">
        <CodeTab editorText={editorText} />
      </CustomTabsContent>

      <CustomTabsContent value="cost">
        <CostTab costResult={costResult} isCostTabLoading={isLoading} />
      </CustomTabsContent>

      <CustomTabsContent className="overflow-y-hidden" value="terraform">
        <TerraformTab />
      </CustomTabsContent>
    </Tabs>
  )
}

export default ExplainSection
