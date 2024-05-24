import { z } from "zod"
import { StateCreator } from "zustand"

export const CostEstimationAISchema =  z.object({
  columns: z.array(z.string()).describe("columns of the table"),
  rows: z.array(z.array(z.string())).describe("rows of the table"),
  summary: z.string().describe("summary of the table cost"),
  monthlyCost: z.number().describe("monthly cost"),
  yearlyCost: z.number().describe("yearly cost")
})

export type CostResult = z.infer<typeof CostEstimationAISchema>

export type CostSlice = {
  costResult?: CostResult
  isLoading: boolean
  setCostResult: (costResult: CostResult) => void
  setIsCostLoading: (isLoading: boolean) => void
}

export const createCostSlice: StateCreator<CostSlice, [], [], CostSlice> = (
  set,
  get
) => ({
  costResult: undefined,
  isLoading: false,
  setCostResult: (costResult: CostResult) => {
    set(state => ({ costResult }))
  },
  setIsCostLoading: (isLoading: boolean) => {
    set(state => ({ isLoading }))
  }
})
