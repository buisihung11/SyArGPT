import { anthropic } from "@ai-sdk/anthropic"
import { streamText } from "ai"
import { NextResponse } from "next/server"

export const maxDuration = 60

export async function POST(request: Request) {
  try {
    const { prompt }: { prompt: string } = await request.json()

    const anthropicModel = anthropic("claude-3-sonnet-20240229")

    // TODO: Move code from python to here
    const result = await streamText({
      model: anthropicModel,
      system: "You are a helpful assistant.",
      prompt
    })

    return result.toDataStreamResponse()
  } catch (e: any) {
    console.error(e)
    return NextResponse.json({ error: e.message }, { status: e.status ?? 500 })
  }
}
