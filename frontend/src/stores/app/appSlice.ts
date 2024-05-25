import { StateCreator } from "zustand"

export type ExplainCodeImageSlice = {
  explainResult?: string
  codeResult?: string
  imageResult?: URL | null
  isExplainCodeImageLoading: boolean
  setExplainResult: (explainResult: string) => void
  setCodeResult: (codeResult: string) => void
  setImageResult: (imageResult: URL | null) => void
  setIsExplainCodeImageLoading: (isExplainCodeImageLoading: boolean) => void
}

export const createExplainCodeImageSlice: StateCreator<
  ExplainCodeImageSlice,
  [],
  [],
  ExplainCodeImageSlice
> = (set, get) => ({
  explainResult: undefined,
  codeResult: undefined,
  imageResult: undefined,
  costResult: undefined,
  isExplainCodeImageLoading: false,
  setExplainResult: (explainResult: string) => {
    set(state => ({ explainResult }))
  },
  setCodeResult: (codeResult: string) => {
    set(state => ({ codeResult }))
  },
  setImageResult: (imageResult: URL | null) => {
    set(state => ({ imageResult }))
  },
  setIsExplainCodeImageLoading: (isExplainCodeImageLoading: boolean) => {
    set(state => ({ isExplainCodeImageLoading }))
  }
})
