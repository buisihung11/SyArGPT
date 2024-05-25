import { create } from "zustand"
import { CostSlice, createCostSlice } from "./costSlice"
import { AppSlice, createAppSlice } from "./appSlice"

export const useAppStore = create<CostSlice & AppSlice>((...arg) => ({
  ...createCostSlice(...arg),
  ...createAppSlice(...arg)
}))
