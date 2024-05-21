import { NextRequest, NextResponse } from "next/server"
import { Message as VercelChatMessage, StreamingTextResponse } from "ai"

import { BedrockChat } from "@langchain/community/chat_models/bedrock"
import { PromptTemplate } from "@langchain/core/prompts"
import { HttpResponseOutputParser } from "langchain/output_parsers"
import { AIMessage, ChatMessage, HumanMessage } from "@langchain/core/messages"

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

const TEMPLATE = `You are a pirate named Patchy. All responses must be extremely verbose and in pirate dialect.

Current conversation:
{chat_history}

User: {input}
AI:`

/**
 * This handler initializes and calls a simple chain with a prompt,
 * chat model, and output parser. See the docs for more information:
 *
 * https://js.langchain.com/docs/guides/expression_language/cookbook#prompttemplate--llm--outputparser
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const messages = (body.messages ?? []).filter(
      (message: VercelChatMessage) =>
        message.role === "user" || message.role === "assistant"
    )
    console.log(messages)
    const formattedPreviousMessages = messages
      .slice(0, -1)
      .map(convertVercelMessageToLangChainMessage)
    console.log(formattedPreviousMessages)
    
    const currentMessageContent = messages[messages.length - 1].content
    console.log(currentMessageContent)

    const prompt = PromptTemplate.fromTemplate(TEMPLATE)

    /**
     * You can also try e.g.:
     *
     * import { ChatAnthropic } from "langchain/chat_models/anthropic";
     * const model = new ChatAnthropic({});
     *
     * See a full list of supported models at:
     * https://js.langchain.com/docs/modules/model_io/models/
     */
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

    /**
     * Chat models stream message chunks rather than bytes, so this
     * output parser handles serialization and byte-encoding.
     */
    const outputParser = new HttpResponseOutputParser()

    /**
     * Can also initialize as:
     *
     * import { RunnableSequence } from "@langchain/core/runnables";
     * const chain = RunnableSequence.from([prompt, model, outputParser]);
     */
    const chain = prompt.pipe(model).pipe(outputParser)

    const stream = await chain.stream({
      chat_history: formattedPreviousMessages.join("\n"),
      input: currentMessageContent
    })

    return new StreamingTextResponse(stream)
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: e.status ?? 500 })
  }
}
