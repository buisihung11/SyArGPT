"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { useUser } from "@/lib/serverHook"
import {
  HistorySlice,
  useAppStore,
  useChatStore,
  useHistoryStore,
  useTerraformStore
} from "@/stores"
import { SignedIn, useUser as useClerkUser } from "@clerk/nextjs"
import { Share } from "lucide-react"
import Image from "next/image"
import { v4 } from "uuid"

const Header = () => {
  const { user: clerkUser } = useClerkUser()
  const { user } = useUser()

  const { sessionId, setSessionId } = useAppStore(state => state)

  const refreshCostState = useAppStore(state => state.refreshCostState)
  const refreshExplainCodeImageState = useAppStore(
    state => state.refreshExplainCodeImageState
  )
  const refreshChatState = useChatStore(state => state.refreshChatState)

  const refreshTerraformState = useTerraformStore(
    state => state.refreshTerraformState
  )

  const { refreshHistory } = useHistoryStore((state: HistorySlice) => state)

  const handleNewGeneration = () => {
    refreshCostState()
    refreshExplainCodeImageState()
    refreshTerraformState()
    refreshChatState()
    refreshHistory()

    setSessionId(v4())
  }

  return (
    <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
      <h1 className="text-xl font-semibold">SyArGPT</h1>
      <Badge variant="outline">
        <p className="text-xs text-muted-foreground">Session ID: {sessionId}</p>
      </Badge>
      <div className="ml-auto flex flex-row items-center gap-2 text-sm">
        <Button
          onClick={handleNewGeneration}
          size="sm"
          className="mr-2 text-sm"
        >
          New Generation
        </Button>

        <Button variant="outline" size="sm" className="ml-auto text-sm">
          <Share className="size-3" />
          Share
        </Button>

        <SignedIn>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                {clerkUser?.hasImage && (
                  <Image
                    src={clerkUser?.imageUrl}
                    width={36}
                    height={36}
                    alt="Avatar"
                    className="overflow-hidden rounded-full"
                  />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <div className="flex items-center gap-4">
                  <div className="">
                    {clerkUser?.fullName}
                    <p className="text-xs text-muted-foreground">
                      {clerkUser?.primaryEmailAddress?.emailAddress ?? "N/A"}
                    </p>
                  </div>
                  <div>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button
                          className="rounded-full"
                          variant="outline"
                          size="sm"
                        >
                          {user?.aiLimit} Credits
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-sm font-normal">
                          Credits are used to generate code explanations
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SignedIn>
      </div>
    </header>
  )
}

export default Header
