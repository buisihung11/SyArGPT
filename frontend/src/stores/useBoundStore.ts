import { create } from "zustand"
import { ChatSlice, createBearSlice } from "./chatSlice"

export const useBoundStore = create<ChatSlice>((...a) => ({
  ...createBearSlice(...a)
}))
