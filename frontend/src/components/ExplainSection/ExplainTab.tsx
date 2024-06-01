import { FC } from "react"
import ReactMarkdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import rehypeRaw from "rehype-raw"
import rehypeSanitize from "rehype-sanitize"
import remarkGfm from "remark-gfm"
import { Skeleton } from "../ui/skeleton"

type ExplainTabType = {
  markdown?: string
  isExplainTabLoading: boolean
}

const ExplainTab: FC<ExplainTabType> = ({ markdown, isExplainTabLoading }) => {
  if (isExplainTabLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <p className="text-gray-500 dark:text-gray-400">
            Generating results...
          </p>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-4 w-[120px]" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!markdown) {
    return <h1>No markdown found</h1>
  }

  return (
    <div className="prose w-full">
      <ReactMarkdown
        rehypePlugins={[rehypeHighlight, rehypeRaw, rehypeSanitize]}
        remarkPlugins={[remarkGfm]}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  )
}

export default ExplainTab
