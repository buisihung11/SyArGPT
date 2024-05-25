import { NextResponse } from "next/server"

import { costEstimate } from "@/app/actions"
import { Cost, RequestWithMessage } from "@/types"

export async function POST(request: RequestWithMessage) {
  try {
    const reqJSON = await request.json()
    const { message } = reqJSON

    const cost = await costEstimate({ input: message })

    return NextResponse.json<Cost>({
      ...cost
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: e.status ?? 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    health: "ok"
  })
}
