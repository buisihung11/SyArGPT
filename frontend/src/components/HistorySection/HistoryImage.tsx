import { History } from "@/stores"
import Image from "next/image"

export type HistoryImageProps = { history: History }

const HistoryImage = ({ history }: HistoryImageProps) => {
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
