import Image from "next/image"
import React from "react"
import { sampleData } from "../defaultPrompt"
import { Button } from "@/components/ui/button"
import dynamic from "next/dynamic"
import { useChatStore } from "@/stores"

const NoSSRVPBankChallenges = dynamic(() => import("../VPBankChallenges"), {
  ssr: false
})

const ImageInitScreen = () => {
  const setPrompt = useChatStore(state => state.onInputPrompt)

  return (
    <div className="h-full p-6 text-center flex flex-col gap-2 w-full justify-center">
      <div className="flex gap-2 items-center justify-center">
        <Image
          width={40}
          height={40}
          src="/assets/images/wave_hand.webp"
          alt="Online collaboration"
          unoptimized
        />
        <h1 className="text-4xl font-semibold mt-1">Welcome to SyArGPT!</h1>
      </div>
      <p className="text-sm text-muted-foreground">
        Start by creating a new diagram or loading an existing one to begin
        collaborating.
      </p>
      <div className="mt-4">
        <h4 className="text-sm font-semibold tracking-tight mb-2">
          Or try our samples
        </h4>
        <div className="w-full flex flex-row gap-2 items-center justify-center flex-wrap">
          {sampleData.map(data => (
            <Button
              key={data.name}
              onClick={() => {
                setPrompt(data.prompt)
              }}
              variant="outline"
              size="sm"
            >
              {data.name}
            </Button>
          ))}
          <NoSSRVPBankChallenges />
        </div>
      </div>
    </div>
  )
}

export default ImageInitScreen
