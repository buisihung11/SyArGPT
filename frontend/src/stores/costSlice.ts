import { StateCreator } from "zustand"

export type CostResult = {
  summary: string
  rows: string[]
  columns: string[]
}

export type AppSlice = {
  explainResult?: string
  codeResult?: string
  costResult?: CostResult
  imageResult?: URL
  isAppLoading: boolean
  setExplainResult: (explainResult: string) => void
  setCodeResult: (codeResult: string) => void
  setCostResult: (costResult: CostResult) => void
  setImageResult: (imageResult: URL) => void
  setIsAppLoading: (isAppLoading: boolean) => void
}

export const createAppSlice: StateCreator<AppSlice, [], [], AppSlice> = (
  set,
  get
) => ({
  explainResult: undefined,
  codeResult: undefined,
  costResult: undefined,
  isAppLoading: false,
  setExplainResult: (explainResult: string) => {
    set(state => ({ explainResult }))
  },
  setCodeResult: (codeResult: string) => {
    set(state => ({ codeResult }))
  },
  setCostResult: (costResult: CostResult) => {
    set(state => ({ costResult }))
  },
  setImageResult: (imageResult: URL) => {
    set(state => ({ imageResult }))
  },
  setIsAppLoading: (isAppLoading: boolean) => {
    set(state => ({ isAppLoading }))
  }
})
