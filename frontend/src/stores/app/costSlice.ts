import { z } from "zod"
import { StateCreator } from "zustand"

export const CostEstimationAISchema = z.object({
  columns: z.array(z.string()).describe("columns of the table"),
  rows: z.array(z.array(z.string())).describe("rows of the table"),
  summary: z.string().describe("summary of the table cost"),
  monthlyCost: z.number().describe("monthly cost"),
  yearlyCost: z.number().describe("yearly cost")
})

export type CostResult = z.infer<typeof CostEstimationAISchema>

export type CostSlice = {
  costResult?: CostResult
  isCostLoading: boolean
  setCostResult: (costResult: CostResult) => void
  setIsCostLoading: (isCostLoading: boolean) => void
}

export const createCostSlice: StateCreator<CostSlice, [], [], CostSlice> = (
  set,
  get
) => ({
  costResult: undefined,
  isCostLoading: false,
  setCostResult: (costResult: CostResult) => {
    set(state => ({ costResult }))
  },
  setIsCostLoading: (isCostLoading: boolean) => {
    set(state => ({ isCostLoading }))
  }
})
