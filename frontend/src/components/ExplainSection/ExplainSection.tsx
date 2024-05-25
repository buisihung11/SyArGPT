"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

import CostTab from "./CostTab"
import CustomTabsContent from "./CustomTabsContent"
import ExplainTab from "./ExplainTab"
import CodeTab from "./CodeTab"
import TerraformTab from "./TerraformTab"
import { useAppStore } from "@/stores"

const ExplainSection = () => {
  const { isExplainCodeImageLoading, costResult, codeResult, explainResult } =
    useAppStore((state: any) => state)

  return (
    <Tabs
      defaultValue="explain"
      className="h-full relative flex flex-col p-4 max-h-full"
    >
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="explain">Explain</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
        <TabsTrigger value="cost">Cost</TabsTrigger>
        <TabsTrigger value="terraform">Terraform</TabsTrigger>
      </TabsList>

      <CustomTabsContent value="explain">
        <ExplainTab markdown={explainResult} />
      </CustomTabsContent>

      <CustomTabsContent value="code">
        <CodeTab editorText={codeResult} />
      </CustomTabsContent>

      <CustomTabsContent value="cost">
        <CostTab
          costResult={costResult}
          isCostTabLoading={isExplainCodeImageLoading}
        />
      </CustomTabsContent>

      <CustomTabsContent value="terraform">
        <TerraformTab />
      </CustomTabsContent>
    </Tabs>
  )
}

export default ExplainSection
