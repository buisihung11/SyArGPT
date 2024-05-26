import { StateCreator } from "zustand"

export type ChatSlice = {
  messages: Message[]
  prompt: string
  currentMessage: Message | null
  onInputPrompt: (prompt: string) => void
  onConversation: (message: Message) => void
  refreshChatState: () => void
}

const initialState = {
  messages: [],
  prompt: "",
  currentMessage: null
}

export const createChatSlice: StateCreator<ChatSlice, [], [], ChatSlice> = (
  set,
  get
) => ({
  ...initialState,
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
  refreshChatState: () => {
    set(state => ({ ...initialState }))
  }
})
