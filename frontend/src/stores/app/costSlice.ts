import { Cost } from "@/types"
import { StateCreator } from "zustand"

export type CostSlice = {
  costResult?: Cost
  isCostLoading: boolean
  setCostResult: (costResult: Cost) => void
  setIsCostLoading: (isCostLoading: boolean) => void
}

export const createCostSlice: StateCreator<CostSlice, [], [], CostSlice> = (
  set,
  get
) => ({
  costResult: undefined,
  isCostLoading: false,
  setCostResult: (costResult: Cost) => {
    set(state => ({ costResult }))
  },
  setIsCostLoading: (isCostLoading: boolean) => {
    set(state => ({ isCostLoading }))
  }
})
