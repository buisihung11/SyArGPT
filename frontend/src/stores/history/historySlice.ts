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
  histories: History[]
  setHistories: (history: History[]) => void
  refreshHistory: () => void,
  updateHistory: (history: History) => void,
  currentHistory: History | null,
  setCurrentHistory: (history: History) => void
}

const initialState = {
  histories: [],
  currentHistory: null
}

export const createHistorySlice: StateCreator<
  HistorySlice,
  [],
  [],
  HistorySlice
> = (set, get) => ({
  ...initialState,
  setHistories: history => {
    set(state => ({ histories: history }))
  },
  setCurrentHistory: history => {
    set(() => ({ currentHistory: history }))
  },
  refreshHistory: () => {
    set(() => ({ ...initialState }))
  },
  updateHistory: history => {
    set(state => {
      const index = state.histories.findIndex(h => h.id === history.id)
      state.histories[index] = history
      return { histories: state.histories }
    })
  }
})
