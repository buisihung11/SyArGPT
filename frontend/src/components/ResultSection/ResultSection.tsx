"use client"

import { useEffect, useRef, useState } from "react"
import { DrawIoEmbed, DrawIoEmbedRef } from "react-drawio"
import ChatControl from "./ChatControl"
import Image from "next/image"
import { AspectRatio } from "../ui/aspect-ratio"
import { Button } from "../ui/button"
import { GridBackgroundDemo } from "../GridBackground/GridBackground"

const ResultSection = () => {
  const [isInit, setisInit] = useState(true)
  const [viewMode, setViewMode] = useState<"image" | "edit">("image")
  const [isLoaded, setIsLoaded] = useState(false)
  const drawioRef = useRef<DrawIoEmbedRef>(null)

  useEffect(() => {
    if (drawioRef.current && isLoaded) {
      drawioRef.current.layout({
        layouts: []
      })
    }
  }, [isLoaded])

  return (
    <div className="relative flex h-full min-h-[50vh] flex-col">
      <GridBackgroundDemo />
      {isInit ? (
        <div className="h-full p-6 text-center flex flex-col gap-2 w-full justify-center">
          <div className="flex gap-2 items-center justify-center">
            <Image
              width={40}
              height={40}
              src="/assets/images/wave_hand.webp"
              alt="Online collaboration"
            />
            <h1 className="text-4xl font-semibold mt-1">Welcome to SyArGPT!</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Start by creating a new diagram or loading an existing one to begin
            collaborating.
          </p>
        </div>
      ) : viewMode ? (
        <div className="p-4 flex flex-col gap-2 items-center h-full justify-center">
          <AspectRatio ratio={16 / 9} className="bg-muted shadow-md">
            <Image
              src="/assets/images/sample_diagram.png"
              alt="Photo by Drew Beamer"
              fill
              className="rounded-md object-cover cursor-pointer"
            />
          </AspectRatio>
          <div>
            <Button variant="outline" size="sm">
              Edit mode
            </Button>
          </div>
        </div>
      ) : (
        <DrawIoEmbed
          ref={drawioRef}
          onLoad={() => {
            setIsLoaded(true)
          }}
        />
      )}
      <div className="flex-1" />
      <ChatControl />
    </div>
  )
}

export default ResultSection
