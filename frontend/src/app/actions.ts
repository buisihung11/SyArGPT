"use server"

import { z } from "zod"

import { BedrockChat } from "@langchain/community/chat_models/bedrock"
import { PromptTemplate } from "@langchain/core/prompts"
import { StructuredOutputParser } from "@langchain/core/output_parsers"
import { TavilySearchAPIRetriever } from "@langchain/community/retrievers/tavily_search_api"

const retriever = new TavilySearchAPIRetriever({
  k: 3
})

import { CostEstimationAISchema } from "@/stores/costSlice"

// export const runtime = "edge";

/**
 * This handler initializes and calls a simple chain with a prompt,
 * chat model, and output parser. See the docs for more information:
 *
 * https://js.langchain.com/docs/guides/expression_language/cookbook#prompttemplate--llm--outputparser
 */
export async function costEstimate({ input }: { input: string }) {
  try {
    const TEMPLATE = `
      As a cloud architect, you have been tasked with providing a cost estimate from a cloud architecture 
      using the code syntax from https://diagrams.mingrammer.com/. Please ensure the following:

        1. Include all components from the diagram in the cost estimate.
        2. Use valid AWS component names for all services.
        3. Please use default configurations for each service. Please give detail on the configuration summary.
        4. The cost estimate table should have the following columns: Service Name, Monthly Cost, Region, and Config Summary.
        5. Provide a summary of the total cost estimate.
        Here is the cloud architecture diagram:

        \`\`\`
        {{diagram}}
        \`\`\`

        Answer the user's question as best as possible with this format\n{format_instructions}
        `

    const prompt = PromptTemplate.fromTemplate(TEMPLATE)

    const model = new BedrockChat({
      model: "anthropic.claude-3-sonnet-20240229-v1:0", // You can also do e.g. "anthropic.claude-v2"
      region: "ap-southeast-2",
      // endpointUrl: "custom.amazonaws.com",
      credentials: {
        accessKeyId: process.env.BEDROCK_AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.BEDROCK_AWS_SECRET_ACCESS_KEY!
      },
      modelKwargs: { temperature: 0.5 }
    })

    const parser = StructuredOutputParser.fromZodSchema(CostEstimationAISchema)

    const chain = prompt.pipe(model).pipe(parser)

    const result = await chain.invoke({
      format_instructions: parser.getFormatInstructions(),
      diagram: input
    })

    return result
  } catch (e: any) {
    return e.message
  }
}

export async function generateTerraformCode(body: { diagramCode: string }) {
  try {
    const TEMPLATE = `
        Given the following diagram:

        \`\`\`
        {{diagram}}
        \`\`\`

        Generate the terraform code for this diagram.\n{format_instructions}

        llm: |
        AI:
        `

    const prompt = PromptTemplate.fromTemplate(TEMPLATE)

    const model = new BedrockChat({
      model: "anthropic.claude-3-sonnet-20240229-v1:0", // You can also do e.g. "anthropic.claude-v2"
      region: "ap-southeast-2",
      // endpointUrl: "custom.amazonaws.com",
      credentials: {
        accessKeyId: process.env.BEDROCK_AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.BEDROCK_AWS_SECRET_ACCESS_KEY!
      },
      modelKwargs: { temperature: 0.5 }
    })

    const parser = StructuredOutputParser.fromZodSchema(
      z.object({
        code: z.string().describe("terraform code")
      })
    )

    const chain = prompt.pipe(model).pipe(parser)

    const result = await chain.invoke({
      format_instructions: parser.getFormatInstructions(),
      diagram: body.diagramCode
    })

    return result
  } catch (e: any) {
    return e.message
  }
}
