import { create } from "zustand"
import { ChatSlice, createBearSlice } from "./chatSlice"
import { CostSlice, createCostSlice } from "./costSlice"
import { TerraformSlice, createTerraformSlice } from "./terraformSlice"

export const useBoundStore = create<ChatSlice & CostSlice>((...a) => ({
  ...createBearSlice(...a),
  ...createCostSlice(...a)
}))

export const useTerraformStore = create<TerraformSlice>(createTerraformSlice)
