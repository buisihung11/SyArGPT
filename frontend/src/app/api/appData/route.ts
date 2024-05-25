import { NextResponse } from "next/server"

import { safeParseJSON } from "@/lib/utils"
import {
  AppResponse,
  AppResponseFromDownStream,
  RequestWithSessionIdAndMessage
} from "@/types"

const url =
  "https://d5pwmtbqsjjpobgmezncgl3nbm0ejoqr.lambda-url.us-west-2.on.aws/"

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
        message
      })
    })

    const bodyText = await res.text()
    const bodyJSON = safeParseJSON<AppResponseFromDownStream>(bodyText)

    if (!bodyJSON) {
      throw new Error(`Cannot parse json response from ${method} ${res.url}`)
    }

    const { code_block: codeBlock, explain, image } = bodyJSON

    return NextResponse.json<AppResponse>({
      codeBlock,
      explain,
      imageURL: new URL(image || "")
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
