"use client"

import Autoplay from "embla-carousel-autoplay"
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel"
import { FC } from "react"

type FeatureCarouselProps = {
  features: string[]
}

const FeatureCarousel: FC<FeatureCarouselProps> = ({ features }) => {
  return (
    <div className="relative max-w-lg pl-12">
      <div className="absolute left-0 top-0 h-1/2 w-px bg-white/30" />
      <div className="absolute bottom-0 left-0 h-1/2 w-px bg-white" />

      <Carousel
        opts={{
          align: "start"
        }}
        plugins={[
          Autoplay({
            delay: 2000
          })
        ]}
        orientation="vertical"
        className="w-full max-w-lg"
      >
        <CarouselContent className="-mt-1 h-[200px]">
          {features.map((feature, index) => (
            <CarouselItem key={index} className="basis-1 pt-1">
              <p className="text-pretty bg-gradient-to-r from-white via-white to-white/30 bg-clip-text text-3xl leading-10 text-transparent">
                {feature}
              </p>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

export default FeatureCarousel
