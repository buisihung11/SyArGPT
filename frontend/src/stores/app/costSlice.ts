import { Cost } from "@/types"
import { StateCreator } from "zustand"

export type CostSlice = {
  costResult?: Cost | null
  isCostLoading: boolean
  sessionId?: string
  setCostResult: (costResult?: Cost | null) => void
  setIsCostLoading: (isCostLoading: boolean) => void
  setSessionId: (sessionId: string) => void
  refreshCostState: () => void
}

const initialState = {
  costResult: null,
  isCostLoading: false,
  sessionId: undefined
}

export const createCostSlice: StateCreator<CostSlice, [], [], CostSlice> = (
  set,
  get
) => ({
  ...initialState,
  setCostResult: (costResult?: Cost | null) => {
    set(state => ({ costResult }))
  },
  setIsCostLoading: (isCostLoading: boolean) => {
    set(state => ({ isCostLoading }))
  },
  setSessionId: (sessionId: string) => {
    set(state => ({ sessionId }))
  },
  refreshCostState: () => {
    set(state => ({ ...initialState }))
  }
})
