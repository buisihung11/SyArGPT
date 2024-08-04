import { anthropic } from "@ai-sdk/anthropic"
import { streamObject, streamText } from "ai"
import { NextRequest, NextResponse } from "next/server"
import { NextApiRequest } from "next/types"
import { z } from "zod"
import { diagramSchema } from "@/types/diagram"
import { google } from "@ai-sdk/google"

export const maxDuration = 60

export async function POST(request: NextRequest) {
  try {
    const prompt = await request.json()

    const anthropicModel = anthropic("claude-3-sonnet-20240229")
    const geminiModel = google("models/gemini-1.5-flash-latest")
    
    // TODO: Move code from python to here
    const result = await streamObject({
      model: anthropicModel,
      schema: diagramSchema,
      system: `You are aws expert who is helping user generate AWS Architecture Diagram for their project. You will write code using Python Diagrams library\n
      You MUST use diagrams from list below and MUST NOT use anything else (Must use correct syntax, import, methods of library)
      Remember to generate diagrams in detail, describe components and services to use in the architecture`,
      prompt
    })

    return result.toTextStreamResponse() 
  } catch (e: any) {
    console.error(e)
    return NextResponse.json({ error: e.message }, { status: e.status ?? 500 })
  }
}
