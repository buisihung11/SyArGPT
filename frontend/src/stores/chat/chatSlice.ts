import { StateCreator } from "zustand"

export type ChatSlice = {
  messages: Message[]
  prompt: string
  onInputPrompt: (prompt: string) => void
  onConversation: (message: Message) => void
  currentMessage: Message | null
}

export const createChatSlice: StateCreator<ChatSlice, [], [], ChatSlice> = (
  set,
  get
) => ({
  messages: [],
  prompt: "",
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
  currentMessage: null,
  costResult: {
    summary: "",
    rows: [],
    columns: []
  }
})
