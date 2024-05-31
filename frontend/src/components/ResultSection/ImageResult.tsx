import { File } from "lucide-react"
import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { FC, useState } from "react"

import { AppSlice, useChatStore } from "@/stores"

import { Button, buttonVariants } from "../ui/button"
import { sampleData } from "./defaultPrompt"

const NoSSRVPBankChallenges = dynamic(() => import("./VPBankChallenges"), {
  ssr: false
})

type ImageResultType = {
  imageResult?: AppSlice["imageResult"]
  setIsLoadImageError: (loadImage: boolean) => void
}

const ImageResult: FC<ImageResultType> = ({
  imageResult,
  setIsLoadImageError
}) => {
  const setPrompt = useChatStore(state => state.onInputPrompt)
  const [viewMode, setViewMode] = useState<"image" | "edit">("image")

  if (!imageResult) {
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

  return (
    <div className="flex-1 h-full">
      <div
        className={`p-4 flex flex-col gap-2 h-full items-center w-full justify-center ${
          viewMode !== "image" && "hidden"
        }`}
      >
        {imageResult && (
          <>
            <div className="bg-muted shadow-md w-full h-full max-w-[800px] mx-auto relative">
              <Image
                onError={() => {
                  setIsLoadImageError(true)
                }}
                src={imageResult}
                alt="Cloud Architecture Diagram"
                fill
                objectFit="contain"
                className="rounded-md object-cover cursor-pointer"
              />
            </div>
            <div className="flex flex-row gap-2">
              <Link
                className={buttonVariants({ variant: "outline" })}
                href={imageResult}
                download={true}
              >
                <File className="mr-2 h-4 w-4" /> Export
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ImageResult
