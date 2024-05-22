import { Message as VercelChatMessage } from "ai"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

import { BedrockChat } from "@langchain/community/chat_models/bedrock"
import { AIMessage, ChatMessage, HumanMessage } from "@langchain/core/messages"
import { PromptTemplate } from "@langchain/core/prompts"
import {
  StructuredOutputParser
} from "langchain/output_parsers"

// export const runtime = "edge";

const formatMessage = (message: VercelChatMessage) => {
  return `${message.role}: ${message.content}`
}

const convertVercelMessageToLangChainMessage = (message: VercelChatMessage) => {
  if (message.role === "user") {
    return new HumanMessage(message.content)
  } else if (message.role === "assistant") {
    return new AIMessage(message.content)
  } else {
    return new ChatMessage(message.content, message.role)
  }
}

// zod schema that return a json objects contains two keys: columns and rows
// columns is an array of strings, and rows is an array of arrays of strings

// A prompt template that receive a diagrams format (https://diagrams.mingrammer.com/)
// and a message from the user, and returns the cost of the diagram using the AWS Pricing Calulator

const TEMPLATE = `
  Given the following diagram:

  \`\`\`
  {{diagram}}
  \`\`\`

  What is the cost of this diagram using the AWS Pricing Calculator?

  Answer the users question as best as possible.\n{format_instructions}

llm: |
  AI:
`

/**
 * This handler initializes and calls a simple chain with a prompt,
 * chat model, and output parser. See the docs for more information:
 *
 * https://js.langchain.com/docs/guides/expression_language/cookbook#prompttemplate--llm--outputparser
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const input = `
        from diagrams import Cluster, Diagram
        from diagrams.aws.compute import ECS, EKS, Lambda
        from diagrams.aws.database import Redshift
        from diagrams.aws.integration import SQS
        from diagrams.aws.storage import S3
        
        with Diagram("Event Processing", show=False):
            source = EKS("k8s source")
        
            with Cluster("Event Flows"):
                with Cluster("Event Workers"):
                    workers = [ECS("worker1"),
                              ECS("worker2"),
                              ECS("worker3")]
        
                queue = SQS("event queue")
        
                with Cluster("Processing"):
                    handlers = [Lambda("proc1"),
                                Lambda("proc2"),
                                Lambda("proc3")]
        
            store = S3("events store")
            dw = Redshift("analytics")
        
            source >> workers >> queue >> handlers
            handlers >> store
            handlers >> dw
      `
    const prompt = PromptTemplate.fromTemplate(TEMPLATE)

    const model = new BedrockChat({
      model: "anthropic.claude-3-sonnet-20240229-v1:0", // You can also do e.g. "anthropic.claude-v2"
      region: "ap-southeast-2",
      // endpointUrl: "custom.amazonaws.com",
      credentials: {
        accessKeyId: process.env.BEDROCK_AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.BEDROCK_AWS_SECRET_ACCESS_KEY!
      }
      // modelKwargs: {},
    })

    const parser = StructuredOutputParser.fromZodSchema(
      z.object({
        columns: z.array(z.string()).describe("columns of the table"),
        rows: z.array(z.array(z.string())).describe("rows of the table"),
        summary: z.string().describe("summary of the table cost"),
      })
    )

    const chain = prompt.pipe(model).pipe(parser)

    const result = await chain.invoke({
      format_instructions: parser.getFormatInstructions(),
      diagram: input
    })

    return NextResponse.json(result, { status: 200 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: e.status ?? 500 })
  }
}
