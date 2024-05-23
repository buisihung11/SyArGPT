import { StateCreator } from "zustand"

export type CostResult = {
  summary: string
  rows: string[]
  columns: string[]
}

export type AppSlice = {
  costResult?: CostResult
  isAppLoading: boolean
  setCostResult: (costResult: CostResult) => void
  setIsAppLoading: (isAppLoading: boolean) => void
}

export const createAppSlice: StateCreator<AppSlice, [], [], AppSlice> = (
  set,
  get
) => ({
  costResult: undefined,
  isAppLoading: false,
  setCostResult: (costResult: CostResult) => {
    set(state => ({ costResult }))
  },
  setIsAppLoading: (isAppLoading: boolean) => {
    set(state => ({ isAppLoading }))
  }
})
