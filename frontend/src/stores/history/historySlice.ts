import { Cost } from "@/types"
import { StateCreator } from "zustand"
import { TerraformResult } from "../terraform"

export type History = {
  id: string
  prompt: string
  imageResult?: string | null
  explainResult?: string
  codeResult?: string
  costResult?: Cost | null
  terraformResult?: TerraformResult
}

export type HistorySlice = {
  history: History[]
  setHistory: (history: History[]) => void
  refreshHistory: () => void
}

const initialState = {
  history: []
}

export const createHistorySlice: StateCreator<
  HistorySlice,
  [],
  [],
  HistorySlice
> = (set, get) => ({
  ...initialState,
  setHistory: history => {
    set(state => ({ history }))
  },
  refreshHistory: () => {
    set(() => ({ ...initialState }))
  }
})
