import { create } from "zustand"
import { ChatSlice, createBearSlice } from "./chatSlice"
import { CostSlice, createCostSlice } from "./costSlice"

export const useBoundStore = create<ChatSlice & CostSlice>((...a) => ({
  ...createBearSlice(...a),
  ...createCostSlice(...a)
}))
