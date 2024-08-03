import { Webhook } from "svix"
import { headers } from "next/headers"
import { UserJSON, WebhookEvent } from "@clerk/nextjs/server"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  console.log("WEBHOOK_SECRET", WEBHOOK_SECRET)

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    )
  }

  // Get the headers
  const headerPayload = headers()
  const svix_id = headerPayload.get("svix-id")
  const svix_timestamp = headerPayload.get("svix-timestamp")
  const svix_signature = headerPayload.get("svix-signature")

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature
    }) as WebhookEvent
  } catch (err) {
    console.error("Error verifying webhook:", err)
    return new Response("Error occured", {
      status: 400
    })
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const { id, email_addresses, last_name, first_name } = evt.data as UserJSON
  const eventType = evt.type

  switch (eventType) {
    case "user.created":
      const userEmail = email_addresses.at(0)?.email_address

      let existingUser = await prisma.user.findUnique({
        where: { email: userEmail }
      })

      // TODO: Use zod to validate the incoming data

      if (!existingUser) {
        existingUser = await prisma.user.create({
          data: {
            email: userEmail,
            id,
            name: `${first_name} ${last_name}`
          }
        })
      }

      break

    case "user.updated":
      await prisma.user.update({
        where: { id },
        data: {
          email: userEmail,
          name: `${first_name} ${last_name}`,
          updatedAt: new Date()
        }
      })

      break

    case "user.deleted":
      await prisma.user.delete({
        where: { id }
      })

      break

    default:
      break
  }

  return new Response("", { status: 200 })
}
