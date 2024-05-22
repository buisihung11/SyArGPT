import { StateCreator } from "zustand"

export type CostResult = {
  summary: string
  rows: string[]
  columns: string[]
}

export type CostSlice = {
  costResult: CostResult | null
  isLoading: boolean
  setCostResult: (costResult: CostResult) => void
  setIsLoading: (isLoading: boolean) => void
}

export const createCostSlice: StateCreator<CostSlice, [], [], CostSlice> = (
  set,
  get
) => ({
  costResult: null,
  isLoading: false,
  setCostResult: (costResult: CostResult) => {
    set(state => ({ costResult }))
  },
  setIsLoading: (isLoading: boolean) => {
    set(state => ({ isLoading }))
  }
})
