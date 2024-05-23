import { create } from "zustand"
import { ChatSlice, createBearSlice } from "./chatSlice"
import { AppSlice, createAppSlice } from "./costSlice"

export const useBoundStore = create<ChatSlice & AppSlice>((...a) => ({
  ...createBearSlice(...a),
  ...createAppSlice(...a)
}))
