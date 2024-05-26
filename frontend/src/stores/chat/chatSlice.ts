import { v4 } from "uuid"
import { StateCreator } from "zustand"

export type ChatSlice = {
  messages: Message[]
  prompt: string
  currentSessionId: string
  onInputPrompt: (prompt: string) => void
  onConversation: (message: Message) => void
  currentMessage: Message | null
  setCurrentSessionId: (currentSessionId: string) => void
}

export const createChatSlice: StateCreator<ChatSlice, [], [], ChatSlice> = (
  set,
  get
) => ({
  messages: [],
  prompt: "",
  currentSessionId: v4(),
  onInputPrompt: prompt => {
    set(state => ({ prompt }))
  },
  onConversation: message => {
    set(state => {
      return {
        messages: [...state.messages, message],
        currentMessage: message
      }
    })
  },
  setCurrentSessionId: currentSessionId => {
    set(state => ({ currentSessionId }))
  },
  currentMessage: null,
  costResult: {
    summary: "",
    rows: [],
    columns: []
  }
})
