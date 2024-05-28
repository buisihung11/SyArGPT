import { History } from "@/stores"
import Image from "next/image"
import { FC } from "react"

export type HistoryImageProps = { history: History }

const HistoryImage: FC<HistoryImageProps> = ({ history }) => {
  return history.imageResult ? (
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
  )
}

export default HistoryImage
