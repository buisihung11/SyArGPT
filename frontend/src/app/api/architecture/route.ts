import { anthropic } from "@ai-sdk/anthropic"
import { streamObject, streamText } from "ai"
import { NextRequest, NextResponse } from "next/server"
import { NextApiRequest } from "next/types"
import { z } from "zod"
import { diagramSchema } from "@/types/diagram"
import { google } from "@ai-sdk/google"
import { registry } from "@/lib/model/registry"

export const maxDuration = 60

export async function POST(request: NextRequest) {
  try {
    const prompt = await request.json()

    // const model = registry.languageModel("google:models/gemini-1.5-flash-latest")
    const model = registry.languageModel("anthropic:claude-3-sonnet-20240229")

    // TODO: Move code from python to here
    const result = await streamObject({
      model: model,
      schema: diagramSchema,
      system: `You are aws expert who is helping user generate AWS Architecture Diagram for their project. You will write code using Python Diagrams library\n
      You MUST NOT use anything else (Must use correct syntax, import, methods of library). Beside that, the architecture should follow AWS WellArchtecture Framework\n
      Remember to generate diagrams in detail, describe components and services to use in the architecture`,
      prompt
    })

    return result.toTextStreamResponse() 
  } catch (e: any) {
    console.error(e)
    return NextResponse.json({ error: e.message }, { status: e.status ?? 500 })
  }
}
