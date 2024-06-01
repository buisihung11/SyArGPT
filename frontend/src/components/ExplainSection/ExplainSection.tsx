"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

import {
  AppSlice,
  TerraformSlice,
  useAppStore,
  useTerraformStore
} from "@/stores"
import { FC } from "react"
import CodeTab from "./CodeTab"
import CostTab from "./CostTab"
import CustomTabsContent from "./CustomTabsContent"
import ExplainTab from "./ExplainTab"
import TerraformTab from "./TerraformTab"
import { ThreeDotsLoading } from "../ThreeDotLoading"
import ExplainSectionTabItem from "./ExplainSectionTabItem"

const ExplainSection: FC = () => {
  const {
    isDiagramGenerating: isExplainCodeImageLoading,
    isExplanationGenerating,
    isCostLoading,
    costResult,
    codeResult,
    explainResult
  } = useAppStore((state: AppSlice) => state)

  const { isLoading: isTerraformLoading } = useTerraformStore(
    (state: TerraformSlice) => state
  )

  return (
    <Tabs
      defaultValue="diagram"
      className="h-full relative flex flex-col p-4 max-h-full"
    >
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="diagram">
          <ExplainSectionTabItem
            isLoading={isExplainCodeImageLoading}
            content="Diagrams"
          />
        </TabsTrigger>
        <TabsTrigger value="explain">
          <ExplainSectionTabItem
            isLoading={isExplainCodeImageLoading}
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

      <CustomTabsContent value="explain">
        <ExplainTab
          markdown={explainResult}
          isExplainTabLoading={isExplainCodeImageLoading || isExplanationGenerating}
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
