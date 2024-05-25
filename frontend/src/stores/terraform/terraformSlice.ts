import { z } from "zod"
import { StateCreator } from "zustand"

export const TerraformAISchema = z.object({
  files: z.array(
    z.object({
      name: z.string().describe("name of the file"),
      content: z.string().describe("content of the file")
    })
  )
})

export type TerraformResult = z.infer<typeof TerraformAISchema>

export type TerraformSlice = {
  result: TerraformResult
  isLoading: boolean
  setCode: (code: TerraformResult) => void
  setIsLoading: (isLoading: boolean) => void
  logs: any[]
  setLogs: (logs: any[]) => void
}

export const createTerraformSlice: StateCreator<
  TerraformSlice,
  [],
  [],
  TerraformSlice
> = (set, get) => ({
  result: { files: [] },
  isLoading: false,
  setCode: (result: TerraformResult) => {
    set(state => {
      return {
        result
      }
    })
  },
  setIsLoading: (isLoading: boolean) => {
    set(state => ({ isLoading }))
  },
  logs: [],
  setLogs: (logs: any[]) => {
    set(state => ({ logs: [...state.logs, ...logs] }))
  }
})
