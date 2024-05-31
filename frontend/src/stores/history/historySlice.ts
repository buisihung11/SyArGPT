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
  terraformResult?: TerraformResult | null
}

export type HistorySlice = {
  history: History[]
  setHistory: (history: History[]) => void
  refreshHistory: () => void,
  updateHistory: (history: History) => void
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
  },
  updateHistory: history => {
    set(state => {
      const index = state.history.findIndex(h => h.id === history.id)
      state.history[index] = history
      return { history: state.history }
    })
  }
})
