import { cn } from "@/lib/utils"
import { FC } from "react"
import { TabsContent } from "../ui/tabs"
import { CustomTabsContentType } from "./type"

const CustomTabsContent: FC<CustomTabsContentType> = ({
  children,
  value,
  className
}) => {
  return (
    <TabsContent value={value} className={cn("overflow-scroll", className)}>
      {children}
    </TabsContent>
  )
}

export default CustomTabsContent
