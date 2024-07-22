import { useUser as useClerkUser } from "@clerk/nextjs"
import { User } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"

export default function useUser() {
  const { isSignedIn, user: clerkUser } = useClerkUser()

  const { data, isLoading } = useQuery<User>({
    queryKey: ["user", clerkUser?.id],
    queryFn: async () => {
      if (!isSignedIn) return null
      const user = await fetch(`/api/user/${clerkUser.id}`).then(res =>
        res.json()
      )
      return user
    },
    enabled: Boolean(isSignedIn && clerkUser?.id)
  })

  return { user: data, isLoading }
}
