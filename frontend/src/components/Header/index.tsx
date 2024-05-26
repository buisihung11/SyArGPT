"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAppStore, useChatStore, useTerraformStore } from "@/stores"
import { Share } from "lucide-react"
import { v4 } from "uuid"

const Header = () => {
  const sessionId = useAppStore(state => state.sessionId)
  const setSessionId = useAppStore(state => state.setSessionId)

  const refreshCostState = useAppStore(state => state.refreshCostState)
  const refreshExplainCodeImageState = useAppStore(
    state => state.refreshExplainCodeImageState
  )
  const refreshChatState = useChatStore(state => state.refreshChatState)

  const refreshTerraformState = useTerraformStore(
    state => state.refreshTerraformState
  )

  const handleNewGeneration = () => {
    refreshCostState()
    refreshExplainCodeImageState()
    refreshTerraformState()
    refreshChatState()

    setSessionId(v4())
  }

  return (
    <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
      <h1 className="text-xl font-semibold">SyArGPT</h1>
      <Badge variant="outline">
        <p className="text-xs text-muted-foreground">Session ID: {sessionId}</p>
      </Badge>
      <div className="ml-auto gap-1.5 text-sm">
        <Button
          onClick={handleNewGeneration}
          size="sm"
          className="mr-2 gap-1.5 text-sm"
        >
          New Generation
        </Button>

        <Button variant="outline" size="sm" className="ml-auto gap-1.5 text-sm">
          <Share className="size-3" />
          Share
        </Button>
      </div>
    </header>
  )
}

export default Header
