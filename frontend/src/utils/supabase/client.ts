import { createClient } from "@supabase/supabase-js"

// Add clerk to Window to avoid type errors
declare global {
  interface Window {
    Clerk: any
  }
}

export function createClerkSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    {
      global: {
        // Get the Supabase token with a custom fetch method
        fetch: async (url, options = {}) => {
          const clerkToken = await window.Clerk.session?.getToken({
            template: "supabase"
          })

          // Construct fetch headers
          const headers = new Headers(options?.headers)
          headers.set("Authorization", `Bearer ${clerkToken}`)

          // Now call the default fetch
          return fetch(url, {
            ...options,
            headers
          })
        }
      }
    }
  )
}
