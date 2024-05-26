import { StateCreator } from "zustand"

export type ExplainCodeImageSlice = {
  explainResult?: string
  codeResult?: string
  imageResult?: string | null
  isExplainCodeImageLoading: boolean
  setExplainResult: (explainResult?: string) => void
  setCodeResult: (codeResult?: string) => void
  setImageResult: (imageResult?: string | null) => void
  setIsExplainCodeImageLoading: (isExplainCodeImageLoading: boolean) => void
  refreshExplainCodeImageState: () => void
}

const initialState = {
  explainResult: undefined,
  codeResult: undefined,
  imageResult: undefined,
  isExplainCodeImageLoading: false
}

export const createExplainCodeImageSlice: StateCreator<
  ExplainCodeImageSlice,
  [],
  [],
  ExplainCodeImageSlice
> = (set, get) => ({
  ...initialState,
  setExplainResult: (explainResult?: string) => {
    set(state => ({ explainResult }))
  },
  setCodeResult: (codeResult?: string) => {
    set(state => ({ codeResult }))
  },
  setImageResult: (imageResult?: string | null) => {
    set(state => ({ imageResult }))
  },
  setIsExplainCodeImageLoading: (isExplainCodeImageLoading: boolean) => {
    set(state => ({ isExplainCodeImageLoading }))
  },
  refreshExplainCodeImageState: () => {
    set(state => ({ ...initialState }))
  }
})
