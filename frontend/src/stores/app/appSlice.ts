import { StateCreator } from "zustand"

export type ExplainCodeImageSlice = {
  explainResult?: string
  imageResult?: string | null
  isDiagramGenerating: boolean
  isExplanationGenerating: boolean

  setExplainResult: (explainResult?: string) => void
  setImageResult: (imageResult?: string | null) => void
  setIsDiagramGenerating: (isExplainCodeImageLoading: boolean) => void
  setIsExplanationGenerating: (isExplanationGenerating: boolean) => void
  refreshExplainCodeImageState: () => void
}

const initialState = {
  explainResult: undefined,
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
  setImageResult: (imageResult?: string | null) => {
    set(state => ({ imageResult }))
  },
  setIsDiagramGenerating: (isExplainCodeImageLoading: boolean) => {
    set(state => ({ isDiagramGenerating: isExplainCodeImageLoading }))
  },
  refreshExplainCodeImageState: () => {
    set(state => ({ ...initialState }))
  },
  setIsExplanationGenerating: (isExplanationGenerating: boolean) => {
    set(state => ({ isExplanationGenerating }))
  }
})
