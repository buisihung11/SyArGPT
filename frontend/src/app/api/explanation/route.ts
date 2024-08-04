import { streamObject } from "ai"
import { NextRequest, NextResponse } from "next/server"

import { registry } from "@/lib/model/registry"
import { explainationSchema } from "@/types"

export const maxDuration = 60

export async function POST(request: NextRequest) {
  try {
    const prompt = await request.json()

    // const model = registry.languageModel("google:models/gemini-1.5-flash-latest")
    const model = registry.languageModel("anthropic:claude-3-sonnet-20240229")

    const result = await streamObject({
      model: model,
      system: `You are aws expert who is helping user to understand the system architect that is given in the Python Diagrams library format\n
      Please describe components and services to use in the provided architecture
      `,
      schema: explainationSchema,
      prompt
    })

    return result.toTextStreamResponse()
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
