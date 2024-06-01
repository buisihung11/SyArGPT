import { z } from "zod"

export const CostEstimationAISchema = z.object({
  columns: z.array(z.string()).describe("columns of the table"),
  rows: z.array(z.array(z.string())).describe("rows of the table"),
  summary: z.string().describe("summary of the table cost"),
  monthlyCost: z.number().describe("monthly cost"),
  yearlyCost: z.number().describe("yearly cost")
})

export type Cost = z.infer<typeof CostEstimationAISchema>

export type AppResponse = {
  codeBlock: string
  imageURL: string | null
}

export type ExplanationResponse = {
  explain: string
}