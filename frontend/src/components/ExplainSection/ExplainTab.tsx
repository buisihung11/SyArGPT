import { FC } from "react"
import ReactMarkdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import rehypeRaw from "rehype-raw"
import rehypeSanitize from "rehype-sanitize"
import remarkGfm from "remark-gfm"

type ExplainTabType = {
  markdown?: string
  isExplainTabLoading: boolean
}

const ExplainTab: FC<ExplainTabType> = ({ markdown, isExplainTabLoading }) => {
  if (isExplainTabLoading) {
    return <h1>Loading...</h1>
  }

  if (!markdown) {
    return <h1>No markdown found</h1>
  }
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeHighlight, rehypeRaw, rehypeSanitize]}
      remarkPlugins={[remarkGfm]}
    >
      {markdown}
    </ReactMarkdown>
  )
}

export default ExplainTab
