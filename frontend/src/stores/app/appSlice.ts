import { StateCreator } from "zustand"

export type AppSlice = {
  explainResult?: string
  codeResult?: string
  imageResult?: URL
  isAppLoading: boolean
  setExplainResult: (explainResult: string) => void
  setCodeResult: (codeResult: string) => void
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
  setImageResult: (imageResult: URL) => {
    set(state => ({ imageResult }))
  },
  setIsAppLoading: (isAppLoading: boolean) => {
    set(state => ({ isAppLoading }))
  }
})
