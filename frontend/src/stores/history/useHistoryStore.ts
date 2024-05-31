import { create } from "zustand"
import { HistorySlice, createHistorySlice } from "./historySlice"

export const useHistoryStore = create<HistorySlice>(createHistorySlice)
