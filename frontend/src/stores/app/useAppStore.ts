import { create } from "zustand"
import { CostSlice, createCostSlice } from "./costSlice"
import { ExplainCodeImageSlice, createExplainCodeImageSlice } from "./appSlice"

export type AppSlice = CostSlice & ExplainCodeImageSlice

export const useAppStore = create<AppSlice>((...arg) => ({
  ...createCostSlice(...arg),
  ...createExplainCodeImageSlice(...arg)
}))
