import { NextResponse } from "next/server"
import { google } from "@ai-sdk/google"
import { anthropic } from '@ai-sdk/anthropic';
import { generateText, streamText } from "ai"

import { safeParseJSON } from "@/lib/utils"
import {
  AppExplanResponseFromStream,
  ExplanationResponse,
  RequestWithSessionIdAndMessage
} from "@/types"

const url =
  "https://k3zmjklygabeo4gqvmuiofrgui0awqks.lambda-url.us-west-2.on.aws/"

export const maxDuration = 60

export async function POST(request: Request) {
  try {
    const { prompt }: { prompt: string } = await request.json();

    const anthropicModel = anthropic('claude-3-sonnet-20240229')

    const result = await streamText({
      model: google("models/gemini-1.5-flash"),
      system: "You are a helpful assistant.",
      prompt
    })

    return result.toDataStreamResponse()
  } catch (e: any) {
    console.error(e)
    return NextResponse.json({ error: e.message }, { status: e.status ?? 500 })
  }
}

export async function GET(request: Request) {
  return NextResponse.json({
    health: "ok"
  })
}
