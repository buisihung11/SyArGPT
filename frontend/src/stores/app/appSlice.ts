import { StateCreator } from "zustand"

export type ExplainCodeImageSlice = {
  explainResult?: string
  codeResult?: string
  imageResult?: string | null
  isDiagramGenerating: boolean
  isExplanationGenerating: boolean

  setExplainResult: (explainResult?: string) => void
  setCodeResult: (codeResult?: string) => void
  setImageResult: (imageResult?: string | null) => void
  setIsExplainCodeImageLoading: (isExplainCodeImageLoading: boolean) => void
  setIsExplanationGenerating: (isExplanationGenerating: boolean) => void
  refreshExplainCodeImageState: () => void
}

const initialState = {
  explainResult: undefined,
  codeResult: undefined,
  imageResult: undefined,
  isDiagramGenerating: false,
  isExplanationGenerating: false
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
    set(state => ({ isDiagramGenerating: isExplainCodeImageLoading }))
  },
  refreshExplainCodeImageState: () => {
    set(state => ({ ...initialState }))
  },
  setIsExplanationGenerating: (isExplanationGenerating: boolean) => {
    set(state => ({ isExplanationGenerating }))
  }
})
