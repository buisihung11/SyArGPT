"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { useBoundStore } from "@/stores/useBoundStore"
import CostTab from "./CostTab"
import CustomTabsContent from "./CustomTabsContent"
import ExplainTab from "./ExplainTab"
import CodeTab from "./CodeTab"

const ExplainSection = () => {
  const { isAppLoading, costResult, codeResult, explainResult } = useBoundStore(
    state => state
  )

  return (
    <Tabs defaultValue="explain" className="h-full relative flex flex-col p-4">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="explain">Explain</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
        <TabsTrigger value="cost">Cost</TabsTrigger>
      </TabsList>

      <CustomTabsContent value="explain">
        <ExplainTab markdown={explainResult} />
      </CustomTabsContent>

      <CustomTabsContent value="code">
        <CodeTab editorText={codeResult} />
      </CustomTabsContent>

      <CustomTabsContent value="cost">
        <CostTab costResult={costResult} isCostTabLoading={isAppLoading} />
      </CustomTabsContent>
    </Tabs>
  )
}

export default ExplainSection
