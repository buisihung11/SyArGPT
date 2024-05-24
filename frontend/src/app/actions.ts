"use server"

import { z } from "zod"

import { BedrockChat } from "@langchain/community/chat_models/bedrock"
import { PromptTemplate } from "@langchain/core/prompts"
import { StructuredOutputParser } from "@langchain/core/output_parsers"

// export const runtime = "edge";

/**
 * This handler initializes and calls a simple chain with a prompt,
 * chat model, and output parser. See the docs for more information:
 *
 * https://js.langchain.com/docs/guides/expression_language/cookbook#prompttemplate--llm--outputparser
 */
export async function costEstimate(body: { input: string }) {
  try {
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
      },
      modelKwargs: { temperature: 0.5 }
    })

    const parser = StructuredOutputParser.fromZodSchema(
      z.object({
        columns: z.array(z.string()).describe("columns of the table"),
        rows: z.array(z.array(z.string())).describe("rows of the table"),
        summary: z.string().describe("summary of the table cost")
      })
    )

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
