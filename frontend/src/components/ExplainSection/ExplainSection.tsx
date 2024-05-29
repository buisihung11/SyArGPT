"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { useAppStore } from "@/stores"
import { FC } from "react"
import CodeTab from "./CodeTab"
import CostTab from "./CostTab"
import CustomTabsContent from "./CustomTabsContent"
import ExplainTab from "./ExplainTab"
import TerraformTab from "./TerraformTab"


const ExplainSection: FC = () => {
  const {
    isExplainCodeImageLoading,
    isCostLoading,
    costResult,
    codeResult,
    explainResult
  } = useAppStore((state) => state)

  return (
    <Tabs
      defaultValue="diagram"
      className="h-full relative flex flex-col p-4 max-h-full"
    >
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="code">Diagram</TabsTrigger>
        <TabsTrigger value="explain">Explaination</TabsTrigger>
        <TabsTrigger value="cost">Cost</TabsTrigger>
        <TabsTrigger value="terraform">Terraform</TabsTrigger>
      </TabsList>

      <CustomTabsContent value="explain">
        <ExplainTab
          markdown={explainResult}
          isExplainTabLoading={isExplainCodeImageLoading}
        />
      </CustomTabsContent>

      <CustomTabsContent value="diagram">
        <CodeTab
          editorText={codeResult}
          isCodeTabLoading={isExplainCodeImageLoading}
        />
      </CustomTabsContent>

      <CustomTabsContent value="cost">
        <CostTab costResult={costResult} isCostTabLoading={isCostLoading} />
      </CustomTabsContent>

      <CustomTabsContent className="overflow-y-hidden" value="terraform">
        <TerraformTab />
      </CustomTabsContent>
    </Tabs>
  )
}

export default ExplainSection
