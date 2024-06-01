import { NextResponse } from "next/server"

import { safeParseJSON } from "@/lib/utils"
import {
    AppExplanResponseFromStream,
    ExplanationResponse,
    RequestWithSessionIdAndMessage
} from "@/types"

const url =
  "https://k3zmjklygabeo4gqvmuiofrgui0awqks.lambda-url.us-west-2.on.aws/"

export const maxDuration = 60

export async function POST(request: RequestWithSessionIdAndMessage) {
  try {
    const reqJSON = await request.json()
    const { session_id, message } = reqJSON

    const method = "POST"

    const res = await fetch(url, {
      method,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"
      },
      body: JSON.stringify({
        session_id,
      })
    })

    const bodyText = await res.text()
    const bodyJSON = safeParseJSON<AppExplanResponseFromStream>(bodyText)

    if (!bodyJSON) {
      throw new Error(`Cannot parse json response from ${method} ${res.url}`)
    }

    const { explain } = bodyJSON

    return NextResponse.json<ExplanationResponse>({
        explain
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: e.status ?? 500 })
  }
}

export async function GET(request: Request) {
  return NextResponse.json({
    health: "ok"
  })
}
