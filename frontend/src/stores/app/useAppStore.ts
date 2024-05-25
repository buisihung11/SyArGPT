import { create } from "zustand"
import { CostSlice, createCostSlice } from "./costSlice"

export const useAppStore = create<CostSlice>((...arg) => ({
  ...createCostSlice(...arg)
}))
