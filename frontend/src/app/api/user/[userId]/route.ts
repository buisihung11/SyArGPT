import { getUserById } from "@/lib/repository/user"
import { NextRequest, NextResponse } from "next/server"

// /api/[userId]
export const GET = async (
  req: NextRequest,
  { params }: { params: { userId: string } }
) => {
  const user = await getUserById(params.userId)

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  return NextResponse.json(user)
}
