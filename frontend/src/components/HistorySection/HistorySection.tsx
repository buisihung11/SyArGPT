"use client"

import {
  AppSlice,
  ChatSlice,
  History,
  HistorySlice,
  TerraformSlice,
  useAppStore,
  useChatStore,
  useHistoryStore,
  useTerraformStore
} from "@/stores"
import Image from "next/image"
import { Card, CardContent } from "../ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "../ui/carousel"

const HistorySection = () => {
  const { history } = useHistoryStore((state: HistorySlice) => state)
  const { setExplainResult, setCodeResult, setCostResult, setImageResult } =
    useAppStore((state: AppSlice) => state)
  const { onInputPrompt } = useChatStore((state: ChatSlice) => state)
  const { setCode } = useTerraformStore((state: TerraformSlice) => state)

  const handleHistoryItemClick = (history: History): void => {
    const {
      prompt,
      imageResult,
      explainResult,
      codeResult,
      costResult,
      terraformResult
    } = history

    setExplainResult(explainResult)
    setCodeResult(codeResult)
    setCostResult(costResult)
    setImageResult(imageResult)
    onInputPrompt(prompt)
    setCode(terraformResult || { files: [] })
  }

  return (
    <div className="h-full flex flex-col p-4 gap-4 bg-background border-t-2">
      <h1 className="text-xl font-semibold">History</h1>
      {history.length > 0 ? (
        <Carousel
          opts={{
            align: "start"
          }}
          className="w-[80%] self-center"
        >
          <CarouselContent>
            {history.map(history => (
              <CarouselItem
                key={history.id}
                className="md:basis-1/2 lg:basis-1/3"
                onClick={() => handleHistoryItemClick(history)}
              >
                <Card className="max-w-[6rem]">
                  <CardContent className="flex aspect-square items-center justify-center p-2 text-center w-full h-full relative bg-muted">
                    {history.imageResult ? (
                      <Image
                        fill
                        objectFit="cover"
                        src={history.imageResult}
                        alt="test"
                        className="p-2 rounded-md object-cover cursor-pointer"
                      />
                    ) : (
                      <Image
                        fill
                        objectFit="contain"
                        src="/asset/noImgErr.webp"
                        alt="No Image found"
                      />
                    )}
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <p>No history recorded</p>
      )}
    </div>
  )
}

export default HistorySection
