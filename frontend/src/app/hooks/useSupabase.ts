import { createClerkSupabaseClient } from "@/utils/supabase/client"

/**
 * Custom hook for accessing the Supabase client instance.
 * @returns An object containing the Supabase client instance.
 */
const useSupabase = () => {
  const supabase = createClerkSupabaseClient()

  return {
    supabase
  }
}

export default useSupabase
