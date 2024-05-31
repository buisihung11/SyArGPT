import { create } from "zustand"
import { ChatSlice, createChatSlice } from "./chatSlice"

export const useChatStore = create<ChatSlice>(createChatSlice)
