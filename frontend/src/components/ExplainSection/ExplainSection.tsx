"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

import {
  AppSlice,
  HistorySlice,
  TerraformSlice,
  useAppStore,
  useHistoryStore,
  useTerraformStore
} from "@/stores"
import { FC } from "react"
import CodeTab from "./CodeTab"
import CostTab from "./CostTab"
import CustomTabsContent from "./CustomTabsContent"
import ExplainSectionTabItem from "./ExplainSectionTabItem"
import ExplainTab from "./ExplainTab"
import TerraformTab from "./TerraformTab"

const ExplainSection: FC = () => {
  const {
    isDiagramGenerating,
    isExplanationGenerating,
    isCostLoading,
    costResult,
    explainResult
  } = useAppStore((state: AppSlice) => state)

  const { currentHistory } = useHistoryStore((state: HistorySlice) => state)
  const { codeResult } = currentHistory || {}

  const { isLoading: isTerraformLoading } = useTerraformStore(
    (state: TerraformSlice) => state
  )

  return (
    <Tabs
      defaultValue="diagram"
      className="relative flex h-full max-h-full flex-col p-4"
    >
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="diagram">
          <ExplainSectionTabItem
            isLoading={isDiagramGenerating}
            content="Diagrams"
          />
        </TabsTrigger>
        <TabsTrigger value="explain">
          <ExplainSectionTabItem
            isLoading={isDiagramGenerating || isExplanationGenerating}
            content="Explanation"
          />
        </TabsTrigger>
        <TabsTrigger value="cost">
          <ExplainSectionTabItem isLoading={isCostLoading} content="Cost" />
        </TabsTrigger>
        <TabsTrigger value="terraform">
          <ExplainSectionTabItem
            isLoading={isTerraformLoading}
            content="Terraform"
          />
        </TabsTrigger>
      </TabsList>

      <CustomTabsContent value="diagram">
        <CodeTab editorText={codeResult} isGenerating={isDiagramGenerating} />
      </CustomTabsContent>

      <CustomTabsContent value="explain">
        <ExplainTab
          markdown={explainResult}
          isExplainTabLoading={isDiagramGenerating || isExplanationGenerating}
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
