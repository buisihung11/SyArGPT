import { anthropic } from "@ai-sdk/anthropic"
import { google } from "@ai-sdk/google"
import { experimental_createProviderRegistry as createProviderRegistry } from "ai"

export const registry = createProviderRegistry({
  anthropic,
  google
})
