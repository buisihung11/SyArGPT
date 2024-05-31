import { useChatStore } from "@/stores"
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { FC } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem
} from "../../ui/dropdown-menu"
import { VPBankButton } from "./VPBankButton"

export const VPBankChallenges: FC<{ vpBankChallenges: any }> = ({
  vpBankChallenges
}) => {
  const setPrompt = useChatStore(state => state.onInputPrompt)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <VPBankButton />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {vpBankChallenges.map((data: any) => (
          <DropdownMenuItem
            key={data.name}
            onClick={() => {
              setPrompt(data.prompt)
            }}
          >
            {data.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
