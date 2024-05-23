import { StateCreator } from "zustand"

export type CostResult = {
  summary: string
  rows: string[]
  columns: string[]
}

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
